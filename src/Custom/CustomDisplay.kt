import org.w3c.dom.*

class CustomDisplay(canvasContainer: HTMLElement, playerArea: HTMLElement, gameAreaTop: HTMLElement, gameAreaRight: HTMLElement)
	: GameDisplay<Custom, CustomState, CustomField, CustomAction, Int>(canvasContainer, playerArea, gameAreaTop, gameAreaRight) {
	override var game = Custom()
	override val playerTypes = listOf<PlayerType<CustomState, CustomAction>>(HumanType())

	private var originPosition: Position? = null

	override val getColor = getColor@{ field: CustomField, _: Int, _: Int ->
		when (field.terrain) {
			CustomTerrain.Plains -> "yellow"
			CustomTerrain.Cliffs -> "grey"
		}
	}
	override val draw = { context: CanvasRenderingContext2D, fieldSize: Double, field: CustomField, x: Int, y: Int ->
		val image = when (field.piece?.type) {
			CustomPieceType.Soldier -> "S" + (field.piece.player + 1)
			CustomPieceType.Healer -> "S" + (field.piece.player + 1) + "R"
			else -> null
		}
		if (image != null)
			context.drawImage(images[image], 0.0, 0.0, fieldSize, fieldSize)
	}

	init {
		addImages("S1", "S1R", "S2", "S2R", "S3", "S3R", "S4", "S4R", "B", "BR", "F", "T", "C", "G")
		players.add(Player("Player 1", "green", HumanController()))
		players.add(Player("Player 2", "blue", HumanController()))
		players.add(Player("Player 3", "red", HumanController()))
		gridDisplay.outerBorder = 10.0
		gridDisplay.hexagonal = true
		maxPlayers = 2
		newPlayerButton.disabled = true

		startNewGame()

		gridDisplay.onClick = onClick@{
			if (game.currentPlayer() is Player && it.x >= 0 && it.y >= 0 && it.x < game.state.width && it.y < game.state.height) {
				val origin = originPosition
				if (origin == null) {
					originPosition = Position(it.x, it.y)
					updateDisplay()
				} else {
					originPosition = null
					val playerController = game.currentPlayer()?.controller as? HumanController ?: return@onClick
					playerController.performAction(CustomAction(CustomActionType.Move, origin, Position(it.x, it.y)))
				}
			}
		}
	}

	override fun startNewGame() {
		game = Custom()
		for(i in 0 until players.size)
			game.players[i] = players[i]
		game.state = CustomState(playerCount = players.size)
	}

	override val onShowGame: (() -> Unit)? = {
		val context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D
		context.imageSmoothingEnabled = false
		autoSize()
	}
}
