import org.w3c.dom.*
import org.w3c.dom.events.Event
import kotlin.browser.document
import kotlin.browser.window

class AlysDisplay(canvasContainer: HTMLElement, playerArea: HTMLElement, gameAreaTop: HTMLElement, gameAreaRight: HTMLElement)
	: GameDisplay<Alys, AlysState, AlysField?, AlysAction, Int>(canvasContainer, playerArea, gameAreaTop, gameAreaRight) {
	override var game = Alys()

	private var originPosition: Position? = null
	private var buildType: AlysType? = null
	private val previousStates = mutableListOf<AlysState>()
	private var selectedArea = listOf<Position>()
	override val playerTypes = listOf<PlayerType<AlysState, AlysAction>>(HumanType(), RandomAIType(), SimpleAlysAIType())
	private val fortButton = document.createElement("button") as HTMLButtonElement
	private val soldierButton = document.createElement("button") as HTMLButtonElement
	private val undoButton = document.createElement("button") as HTMLButtonElement
	private val endTurnButton = document.createElement("button") as HTMLButtonElement
	private val statusArea = document.createElement("div") as HTMLDivElement


	private val ruleArea = RuleArea("""Alys is a game about conquering an island.
			|<img src="assets/B.png" /> <img src="assets/S1.png" />
			|You expand your territory by recruiting soldiers in town and using them to take new fields. Towns, forts and soldiers all protect the fields next to them, which means you need stronger soldiers to take them.
			|<img src="assets/F.png" /> <img src="assets/T.png" />
			|Towns collect money from the surrounding area every turn, and allow you to buy soldier and forts. Forts provide more protection than towns, so higher rank soldiers are needed to take them. Soldiers are upgraded by moving onto each other.
		""".trimMargin(),
			listOf(
					RuleSection("Gameplay", """<img src="assets/BR.png" /> <img src="assets/S1R.png" />
							|Flags indicate when towns or soldiers are ready to do something. Clicking on an area with a town that has a flag will let you create soldiers and forts. With a town selected, you'll be able to press the buttons above the map.
							|
							|<img src="assets/F.png" />
							|Press the "Build Fort" button and select an empty field in the highlighted area to build a fort there.
							|<img src="assets/S1.png" /> <img src="assets/S2.png" />
							|Press the "Hire Soldier" button and select a field in or next to the highlighted area to place a soldier there. You can also click an existing soldier with a flag to give it orders.
							|
							|A soldier can be placed on any field in your own area, other than on forts or towns, and on any enemy field whose defense it is strong enough to beat. Placing one soldier onto another create an upgraded soldier.
						""".trimMargin()),
					RuleSection("Towns", """<img src="assets/B.png" /> <img src="assets/BR.png" />
							|Towns are the centers of your areas. Each area consisting of at least two fields will have a town, which collects the money you gain from the area. You can see those details in the top right corner.
							|
							|At the beginning of every turn, the town's treasury grows by one per field in its area, except those that are overgrown. Then the upkeep for soldiers in the area is paid. If there's not enough money to pay your soldiers, they'll die and leave a grave.
							|
							|When two areas with a town each are connected, the town with the smaller treasury transfers its money to the other and disappears.
							|
							|A town protects the fields you own next to it, so a soldier of at least Veteran rank is needed to take it. When a town is destroyed, its treasury is lost.
						""".trimMargin()),
					RuleSection("Soldiers", """<img src="assets/S1.png" /> <img src="assets/S2.png" /> <img src="assets/S3.png" /> <img src="assets/S4.png" />
							|Soldiers are used to conquer the enemies' fields. They can move to any field neighbouring the area they are in. Like towns, soldiers protect the fields around them. Soldiers come in four ranks. Stronger soldiers beat weaker soldiers, but cost more upkeep.
							|
							|Upgrade a soldier by moving another soldier onto it.
							|<img src="assets/S1.png" /> <img src="assets/S1R.png" />
							|Recruits (upkeep 2) are only able to take undefended fields.
							|<img src="assets/S2.png" /> <img src="assets/S2R.png" />
							|Veterans (upkeep 6) can take fields defended by towns and recruits.
							|<img src="assets/S3.png" /> <img src="assets/S3R.png" />
							|Elites (upkeep 18) can take fields defended by forts and lower rank soldiers.
							|<img src="assets/S4.png" /> <img src="assets/S4R.png" />
							|Generals (upkeep 54) can take any field.
							|
							|Soldiers can generally only do one thing per turn, but are able to move freely between your empty fields.
						""".trimMargin()),
					RuleSection("Other details", """<img src="assets/F.png" />
							|Fort defend and area and cost no upkeep. Only a soldier of at least Knight rank can destroy it.
							|<img src="assets/T.png" /> <img src="assets/C.png" />
							|Some fields are overgrown by trees or bushes. Overgrown fields provide no money to the town in the area, but can be removed by soldiers
							|
							|Whenever an empty field is adjacent to two trees, the trees will spread to that area. Bushes only grow on coastal fields, and spread to adjacent empty coastal fields. Try not to get overwhelmed.
							|<img src="assets/G.png" />
							|Graves are left by soldiers when their upkeep wasn't paid. The following turn they'll overgrow and turn into trees or bushes, depending on whether they're near the coast or not.
							|
							|The game is won when there are no enemy towns left.
						""".trimMargin())
			))

	override val getColor = getColor@{ _: AlysField?, x: Int, y: Int ->
		val origin = originPosition
		if (origin != null && origin.x == x && origin.y == y)
			return@getColor "white"
		val piece = game.state.board[x, y] ?: return@getColor "transparent"
		val player = game.players[piece.player]
		if (player != null)
			return@getColor player.color
		return@getColor "white"
	}

	override val draw = draw@{ context: CanvasRenderingContext2D, fieldSize: Double, field: AlysField?, x: Int, y: Int ->
		if (field == null)
			return@draw
		context.lineWidth = 2.0
		if (Position(x, y) in selectedArea) {
			context.strokeStyle = "white"
			context.stroke(gridDisplay.hexPathOffset)
		}
		val image = when (field.piece?.type) {
			AlysType.Fort -> "F"
			AlysType.Soldier -> soldierImage(field.piece, field.player == game.state.currentPlayer)
			AlysType.Tree -> "T"
			AlysType.CoastTree -> "C"
			AlysType.Grave -> "G"
			else -> if (field.treasury != null && field.treasury >= 10 && field.player == game.state.currentPlayer) "BR"
			else if (field.treasury != null) "B"
			else null
		}
		if (image != null)
			context.drawImage(images[image], 0.0, 0.0, fieldSize, fieldSize)
	}

	private fun soldierImage(piece: AlysPiece, showReady: Boolean): String {
		val flag = if (piece.hasMoved || !showReady) "" else "R"
		return when (piece.strength) {
			1 -> "S1$flag"
			2 -> "S2$flag"
			3 -> "S3$flag"
			4 -> "S4$flag"
			else -> "S1$flag"
		}
	}

	init {
		addImages("S1", "S1R", "S2", "S2R", "S3", "S3R", "S4", "S4R", "B", "BR", "F", "T", "C", "G")

		aiDelay = 100
		gridDisplay.hexagonal = true
		gridDisplay.gridColor = "#7df"
		gridDisplay.outerBorder = 50.0
		statusArea.className = "status-area"
		statusArea.textContent = "Nothing selected"
		fortButton.textContent = "Build fort (15)"
		soldierButton.textContent = "Hire soldier (10)"
		undoButton.textContent = "Undo"
		endTurnButton.textContent = "End turn"
		fortButton.addEventListener("click", ::buildFort)
		soldierButton.addEventListener("click", ::hireSoldier)
		undoButton.addEventListener("click", ::undo)
		endTurnButton.addEventListener("click", ::endTurn)

		players.add(Player("Player 1", "#0b9", HumanController()))
		players.add(Player("Player 2", "green", RandomAIController()))
		players.add(Player("Player 3", "yellowgreen", RandomAIController()))
		players.add(Player("Player 4", "yellow", RandomAIController()))
		players.add(Player("Player 5", "orange", RandomAIController()))

		gridDisplay.onClick = click@{
			if (game.currentPlayer() is Player && game.state.board.isWithinBounds(it)) {
				val origin = originPosition
				if (origin == null) {
					val selectedField = game.state.board[it] ?: return@click
					if (selectedField.player != game.state.currentPlayer)
						return@click
					if (selectedField.piece?.type == AlysType.Soldier) {
						if (selectedField.piece.hasMoved)
							return@click
						selectField(it)
						return@click
					}
					val selectedArea = game.state.connectedPositions(it)
					selectField(selectedArea.find { it.field.treasury != null }?.position)
					updateDisplay()
				} else {
					if (origin == it) {
						selectField(null)
						return@click
					}
					val sourceField = game.state.board[origin]
					val type = buildType
					val destination = game.state.board[it]
					if (sourceField?.piece?.type == AlysType.Soldier && destination?.treasury != null && destination.player == sourceField.player) {
						selectField(it)
						return@click
					} else if (sourceField?.piece?.type == AlysType.Soldier) {
						val playerController = game.currentPlayer()?.controller as? HumanController ?: return@click
						playerController.performAction(AlysMoveAction(origin, it))
					} else if (type != null) {
						val playerController = game.currentPlayer()?.controller as? HumanController ?: return@click
						playerController.performAction(AlysCreateAction(type, origin, it))
					} else if (sourceField?.treasury != null) {
						if (destination?.player == game.state.currentPlayer &&
								(destination.treasury != null || destination.piece?.type == AlysType.Soldier)) {
							selectField(it)
							return@click
						}
					}
				}
			}
		}
	}

	override val onCompleteAction = { success: Boolean ->
		if (success) {
			selectField(null)
			val state = previousState
			if (state != null)
				previousStates.add(state)
		}
	}

	private fun selectField(position: Position?) {
		originPosition = position
		if (position != null)
			selectedArea = game.state.connectedPositions(position).map { it.position }
		else {
			selectedArea = listOf()
			buildType = null
		}
		updateDisplay()
	}

	override val onShowGame: (() -> Unit)? = {
		val context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D
		context.imageSmoothingEnabled = false
		gameAreaTop.appendChild(undoButton)
		gameAreaTop.appendChild(soldierButton)
		gameAreaTop.appendChild(fortButton)
		gameAreaTop.appendChild(endTurnButton)
		gameAreaRight.appendChild(statusArea)
		ruleArea.showRules(gameAreaRight)
		autoSize()
	}

	override fun startNewGame() {
		game = Alys()
		for (i in 1..players.size)
			game.players[i] = players[i - 1]
		game.newGame(seed = (0..100000).random())
	}

	override fun updateDisplay() {
		val winner = game.winner
		if (winner != null) {
			messageLine.textContent = winner.name + " has won after " + game.state.round + " rounds!"
			messageLine.className = "message-line"
		} else {
			turnLine.textContent = "Current player: " + game.currentPlayer()?.name
		}
		val origin = originPosition
		val selectedField = if (origin != null) game.state.board[origin] else null
		if (selectedField?.treasury != null) {
			statusArea.textContent = "Treasury: " + selectedField.treasury +
					"\nExpected income: " + game.state.incomeFor(origin as Position) +
					"\nUpkeep: " + game.state.connectedPositions(origin)
					.mapNotNull { it.field.piece }
					.sumBy { Alys.upkeepFor(it) }
			if (buildType == AlysType.Soldier)
				statusArea.textContent += "\nCurrently hiring soldier"
			if (buildType == AlysType.Fort)
				statusArea.textContent += "\nCurrently building fort"
		} else {
			statusArea.textContent = "No town selected"
		}
		gridDisplay.display(game.state.board, getColor, draw)
		updateButtons()
	}

	private fun updateButtons() {
		val source = originPosition
		val base = if (source != null) game.state.board[source] else null
		if (base?.treasury != null) {
			fortButton.disabled = buildType == AlysType.Fort || base.treasury < 15
			soldierButton.disabled = buildType == AlysType.Soldier || base.treasury < 10
		} else {
			fortButton.disabled = true
			soldierButton.disabled = true
		}
		if (previousState?.currentPlayer != game.state.currentPlayer)
			previousStates.clear()
		undoButton.disabled = previousStates.isEmpty()
	}

	private fun hireSoldier(event: Event) {
		buildType = AlysType.Soldier
		updateButtons()
		statusArea.textContent += "\nCurrently hiring soldier"
	}

	private fun buildFort(event: Event) {
		buildType = AlysType.Fort
		updateButtons()
		statusArea.textContent += "\nCurrently building fort"
	}

	private fun undo(event: Event) {
		game.state = previousStates.removeAt(previousStates.size - 1)
		updateDisplay()
	}

	private fun endTurn(event: Event) {
		val playerController = game.currentPlayer()?.controller as? HumanController ?: return
		playerController.performAction(AlysEndTurnAction())
	}
}
