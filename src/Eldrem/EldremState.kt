data class EldremState(
		val width: Int = 15, val height: Int = 15,
		val playerCount: Int = 3,
		override val board: Grid<EldremField> = Grid(width, height, { x, y ->
			EldremField(EldremTerrain.Plains, if(x==y) EldremPiece(x%3, EldremPieceType.values().random()) else null)
		}),
		override var currentPlayer: Int = 0,
		override val players: List<Int> = (0 until playerCount).toList()
) : BoardGameState<EldremField, EldremAction, Int> {

	override fun findWinner(): Int? {
		return null
	}
}
