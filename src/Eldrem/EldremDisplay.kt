import org.w3c.dom.*

class EldremDisplay(canvasContainer: HTMLElement, playerArea: HTMLElement, gameAreaTop: HTMLElement, gameAreaRight: HTMLElement)
	: GameDisplay<Eldrem, EldremState, EldremPiece?, EldremAction, EldremPiece>(canvasContainer, playerArea, gameAreaTop, gameAreaRight) {
	override var game = Eldrem()
	override val playerTypes = listOf<PlayerType<EldremState, EldremAction>>(HumanType(), RandomAIType())

	override val getColor = null
	override val draw = { context: CanvasRenderingContext2D, fieldSize: Double, piece: EldremPiece?, _: Int, _: Int ->
		context.fillStyle = "black"
		context.font = fieldSize.toString() + "px arial"
		context.textBaseline = CanvasTextBaseline.TOP
		when (piece) {
			EldremPiece.Cross -> context.fillText("X", 0.0, 0.0)
			EldremPiece.Circle -> context.fillText("O", 0.0, 0.0)
		}
	}

	init {
		players.add(Player("Cross", controller = HumanController()))
		players.add(Player("Circle", controller = RandomAIController()))
		gridDisplay.outerBorder = 10.0
		gridDisplay.showHexagons()
		maxPlayers = 2
		newPlayerButton.disabled = true

		startNewGame()

		gridDisplay.onClick = onClick@{
			if (game.currentPlayer() is Player && it.x >= 0 && it.y >= 0 && it.x < 3 && it.y < 3){
				val playerController = game.currentPlayer()?.controller as? HumanController ?: return@onClick
				playerController.performAction(EldremAction(game.state.currentPlayer, it.x, it.y))
			}
		}
	}

	override fun startNewGame() {
		game = Eldrem()
		game.players[EldremPiece.Cross] = players[0]
		game.players[EldremPiece.Circle] = players[1]
	}
}
