data class CustomState(
		val width: Int = 15, val height: Int = 15,
		val playerCount: Int = 3,
		override val board: Grid<CustomField> = Grid(width, height, { x, y ->
			CustomField(CustomTerrain.Plains, if(x==y) CustomPiece(x%3, CustomPieceType.values().random()) else null)
		}),
		override var currentPlayer: Int = 0,
		override val players: List<Int> = (0 until playerCount).toList()
) : BoardGameState<CustomField, CustomAction, Int> {

	override fun findWinner(): Int? {
		return null
	}
}
