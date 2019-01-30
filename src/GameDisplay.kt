import kotlinx.coroutines.*
import org.w3c.dom.*
import kotlin.browser.document
import kotlin.browser.window
import kotlin.math.min

abstract class GameDisplay<G : BoardGame<S, T, A, P>, S : BoardGameState<T, A, P>, T, A, P>(
		val canvasContainer: HTMLElement,
		val playerArea: HTMLElement,
		val gameAreaTop: HTMLElement,
		val gameAreaRight: HTMLElement
) {
	abstract var game: G
	val canvas = document.createElement("canvas") as HTMLCanvasElement
	val gridDisplay = GridDisplay(canvas)
	var aiDelay = 200L
	val playerTypes = mutableListOf<PlayerType>(HumanPlayerType())
	val players = mutableListOf<Player>()
	var minPlayers = 2
	var maxPlayers = 8
	val playerList = document.createElement("div") as HTMLDivElement
	val newGameButton = document.createElement("button") as HTMLButtonElement
	val newPlayerButton = document.createElement("button") as HTMLButtonElement
	val turnLine = document.createElement("div") as HTMLDivElement
	val messageLine = document.createElement("div") as HTMLDivElement
	var previousState: S? = null

	abstract val getColor: ((T, x: Int, y: Int) -> String)?
	abstract val draw: ((context: CanvasRenderingContext2D, fieldSize: Double, field: T, x: Int, y: Int) -> Unit)?


	init {
		turnLine.className = "message-line"
		messageLine.className = "message-line"
		newGameButton.className = "new-game"
		newGameButton.textContent = "Start new game"
		newGameButton.onclick = {
			startNewGame()
		}
		newPlayerButton.textContent = "Add player"
		newPlayerButton.onclick = {
			if (players.size < maxPlayers)
				players.add(HumanPlayer())
			if (players.size >= maxPlayers)
				newPlayerButton.disabled = true
			updateDisplay()
		}

		GlobalScope.launch {
			startNewGame()
		}
	}

	fun showGame() {
		playerArea.innerHTML = ""
		gameAreaTop.innerHTML = ""
		gameAreaRight.innerHTML = ""
		canvasContainer.innerHTML = ""
		canvasContainer.appendChild(canvas)
		sizeCanvas()
		playerArea.appendChild(playerList)
		playerArea.appendChild(newPlayerButton)
		playerArea.appendChild(newGameButton)
		playerArea.appendChild(turnLine)
		playerArea.appendChild(messageLine)
		onShowGame?.invoke()
		updateDisplay()
	}

	open val onShowGame: (()->Unit)? = null

	fun sizeCanvas(){
		val dpr = window.devicePixelRatio
		val element = canvas.parentElement as HTMLElement
		val styleSize = min(element.clientWidth, window.innerHeight - 40)
		val size = (styleSize * dpr).toInt()
		canvas.style.width = styleSize.toString() + "px"
		canvas.style.height = styleSize.toString() + "px"
		canvas.width = size
		canvas.height = size
		val context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D
		context.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
		context.scale(dpr, dpr)
	}

	abstract fun startNewGame()

	fun performAction(action: A): Boolean {
		val state = game.state
		game.performAction(action).onFailure {
			messageLine.textContent = it.error
			messageLine.className = "message-line"
			GlobalScope.launch {
				delay(4000)
				if(messageLine.className == "message-line")
					messageLine.className = "message-line away"
			}
			updateDisplay()

			console.log("Failed action:")
			console.log(action)
			if (game.winner == null && !game.state.possibleActions().isEmpty())
				awaitActionFrom(game.currentPlayer())
			return false
		}
		previousState = state
		updateDisplay()
		if (game.winner != null || game.state.possibleActions().isEmpty())
			return true
		awaitActionFrom(game.currentPlayer())
		return true
	}

	open fun updateDisplay() {
		val winner = game.winner
		if (winner != null) {
			messageLine.className = "message-line"
			messageLine.textContent = winner.name + " has won!"
		} else {
			turnLine.textContent = "Current player: " + game.currentPlayer()?.name
		}
		gridDisplay.display(game.state.board, getColor, draw)
		updatePlayerList()
	}

	fun awaitActionFrom(player: Any?) {
		if (player is AIPlayer<*, *>) {
			player as AIPlayer<BoardGameState<T, A, P>, A>
			GlobalScope.launch {
				delay(aiDelay)
				performAction(player.requestAction(game.state))
			}
		}
	}

	fun updatePlayerList() {
		playerList.innerHTML = ""
		for (i in 0 until players.size) {
			val player = players[i]
			val playerElement = document.createElement("div") as HTMLDivElement
			val playerName = document.createElement("input") as HTMLInputElement
			val playerType = document.createElement("select") as HTMLSelectElement
			val playerColor = document.createElement("input") as HTMLInputElement
			playerElement.append(playerName, playerType, playerColor)
			setupNameInput(player, playerName)
			setupTypeSelect(player, i, playerType)
			setupColorInput(player, playerColor)
			playerElement.className = "player"
			playerElement.style.backgroundColor = player.color
			playerList.appendChild(playerElement)
		}
	}

	fun setupTypeSelect(player: Player, index: Int, element: HTMLSelectElement) {
		element.className = "player-type"
		for (type in playerTypes) {
			val option = document.createElement("option") as HTMLOptionElement
			option.value = type.name
			option.text = type.name
			if (type.isOfType(player))
				option.selected = true
			element.appendChild(option)
		}
		if (players.size > minPlayers) {
			val option = document.createElement("option") as HTMLOptionElement
			option.value = "delete"
			option.text = "No player"
			element.appendChild(option)
		}
		element.onchange = event@{ event ->
			val value = (event.target as HTMLSelectElement).value
			if (value == "delete") {
				players.removeAt(index)
				if (players.size < maxPlayers)
					newPlayerButton.disabled = false
				updateDisplay()
				return@event null
			}
			val playerType = playerTypes.find { it.name == value } as PlayerType
			players[index] = playerType.getNew(player.name, player.color)
			updateDisplay()
			return@event null
		}
	}

	fun setupNameInput(player: Player, element: HTMLInputElement) {
		element.className = "player-name"
		element.value = player.name
		element.onchange = event@{
			player.name = (it.target as HTMLInputElement).value
			updateDisplay()
			return@event null
		}
	}

	fun setupColorInput(player: Player, element: HTMLInputElement) {
		element.className = "player-color"
		element.value = player.color
		element.onchange = event@{
			player.color = (it.target as HTMLInputElement).value
			updateDisplay()
			return@event null
		}
	}
}

abstract class Player(var name: String = "Player", var color: String = "blue")

class HumanPlayer(name: String = "Player", color: String = "blue") : Player(name, color)

interface AIPlayer<S, A> {
	fun requestAction(state: S): A
	fun endGame(state: S, won: Boolean)
}

class RandomAIPlayer<S : BoardGameState<*, A, *>, A>(name: String = "Player", color: String = "blue") : Player(name, color), AIPlayer<S, A> {
	override fun requestAction(state: S): A {
		val actions = state.possibleActions()
		return actions.random()
	}

	override fun endGame(state: S, won: Boolean) {}
}

class SimpleAIPlayer<S : BoardGameState<*, A, *>, A>(name: String = "Player", color: String = "blue", val utility: (S, A) -> Int = {_,_ -> 1}) : Player(name, color), AIPlayer<S, A> {
	override fun requestAction(state: S): A {
		val actions = state.possibleActions()
		val utilities = actions.map { utility(state, it) }
		val max = utilities.max() ?: actions.random()
		return actions.filterIndexed { i, _ -> utilities[i] == max }.random()
	}

	override fun endGame(state: S, won: Boolean) {}
}

abstract class PlayerType(val name: String) {
	abstract fun isOfType(player: Player): Boolean
	abstract fun getNew(name: String, color: String): Player
}

class HumanPlayerType : PlayerType("Human") {
	override fun isOfType(player: Player): Boolean = player is HumanPlayer
	override fun getNew(name: String, color: String) = HumanPlayer(name, color)
}

class RandomAIPlayerType<S : BoardGameState<*, A, *>, A> : PlayerType("CPU - Weak") {
	override fun isOfType(player: Player): Boolean = player is RandomAIPlayer<*, *>
	override fun getNew(name: String, color: String) = RandomAIPlayer<S, A>(name, color)
}
