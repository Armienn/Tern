import kotlinx.coroutines.*
import org.w3c.dom.*
import kotlin.browser.document
import kotlin.browser.window
import kotlin.math.min

abstract class GameDisplay<G : BoardGame<S, T, A, P>, S : BoardGameState<T, A, P>, T, A, P>(
		private val canvasContainer: HTMLElement,
		private val playerArea: HTMLElement,
		private val gameAreaTop: HTMLElement,
		private val gameAreaRight: HTMLElement
) {
	abstract var game: G
	val canvas = document.createElement("canvas") as HTMLCanvasElement
	val gridDisplay = GridDisplay(canvas)
	var aiDelay = 200L
	abstract val playerTypes: List<PlayerType<S, A>>
	val players = mutableListOf<Player<S, A>>()
	var minPlayers = 2
	var maxPlayers = 8
	val playerList = document.createElement("div") as HTMLDivElement
	val newGameButton = document.createElement("button") as HTMLButtonElement
	val newPlayerButton = document.createElement("button") as HTMLButtonElement
	val turnLine = document.createElement("div") as HTMLDivElement
	val messageLine = document.createElement("div") as HTMLDivElement
	var previousState: S? = null
	var loopJop: Job? = null
	val images = mutableMapOf<String, HTMLImageElement>()

	open val getColor: ((T, x: Int, y: Int) -> String)? = null
	open val draw: ((context: CanvasRenderingContext2D, fieldSize: Double, field: T, x: Int, y: Int) -> Unit)? = null
	open val onShowGame: (()->Unit)? = null
	open val onCompleteAction: ((success: Boolean) -> Unit)? = null

	init {
		turnLine.className = "message-line"
		messageLine.className = "message-line"
		newGameButton.className = "new-game"
		newGameButton.textContent = "Start new game"
		newGameButton.onclick = onclick@{
			startNewGame()
			messageLine.textContent = ""
			updateDisplay()
			loopJop?.cancel()
			loopJop = GlobalScope.launch {
				turnLoop(this)
			}
			return@onclick null
		}
		newPlayerButton.textContent = "Add player"
		newPlayerButton.onclick = {
			if (players.size < maxPlayers)
				players.add(Player("Player " + (players.size + 1), "blue", playerTypes[0].getController() ))
			if (players.size >= maxPlayers)
				newPlayerButton.disabled = true
			updatePlayerList()
		}

		GlobalScope.launch {
			startNewGame()
			messageLine.textContent = ""
			updateDisplay()
			loopJop = GlobalScope.launch {
				turnLoop(this)
				val bla = promise {  }
				bla.then {  }
			}
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
		updatePlayerList()
	}

	private fun sizeCanvas(){
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
		gridDisplay.updateHexagonStuff()
	}

	fun autoSize() {
		val scale = window.devicePixelRatio
		val size = ((canvas.width / scale - gridDisplay.outerBorder * 2) / (game.state.board.width + 1)).toInt()
		gridDisplay.fieldSize = (if (size % 2 == 0) size - 1 else size).toDouble()
		gridDisplay.updateHexagonStuff()
	}

	private fun addImage(name: String) {
		images[name] = document.createElement("img") as HTMLImageElement
		images[name]?.src = "assets/$name.png"
	}

	fun addImages(vararg names: String) {
		for (name in names)
			addImage(name)
	}

	abstract fun startNewGame()

	private suspend fun turnLoop(scope: CoroutineScope){
		while(game.winner == null && scope.isActive){
			val controller = game.currentPlayer()?.controller
			if(controller == null){
				messageLine.textContent = "No current player?"
				return
			}
			val action = withContext(Dispatchers.Unconfined) {
				delay(aiDelay)
				controller.requestAction(game.state)
			}
			val success = performAction(action)
			onCompleteAction?.invoke(success)
		}
	}

	private fun performAction(action: A): Boolean {
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
			return false
		}
		previousState = state
		updateDisplay()
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
	}

	private fun updatePlayerList() {
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

	private fun setupTypeSelect(player: Player<S, A>, index: Int, element: HTMLSelectElement) {
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
				updatePlayerList()
				return@event null
			}
			val playerType = playerTypes.find { it.name == value } as PlayerType
			player.controller = playerType.getController()
			loopJop?.cancel()
			loopJop = GlobalScope.launch {
				turnLoop(this)
			}
			updateDisplay()
			updatePlayerList()
			return@event null
		}
	}

	private fun setupNameInput(player: Player<S, A>, element: HTMLInputElement) {
		element.className = "player-name"
		element.value = player.name
		element.onchange = event@{
			player.name = (it.target as HTMLInputElement).value
			updateDisplay()
			updatePlayerList()
			return@event null
		}
	}

	private fun setupColorInput(player: Player<S, A>, element: HTMLInputElement) {
		element.className = "player-color"
		element.value = player.color
		element.onchange = event@{
			player.color = (it.target as HTMLInputElement).value
			updateDisplay()
			updatePlayerList()
			return@event null
		}
	}
}
