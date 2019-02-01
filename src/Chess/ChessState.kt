data class ChessState(
		override val board: Grid<ChessPiece?> = Grid(8, 8, { x, y ->
			when (y) {
				0 -> when (x) {
					0 -> ChessPiece(ChessPieceType.Rook, ChessPlayer.White)
					1 -> ChessPiece(ChessPieceType.Knight, ChessPlayer.White)
					2 -> ChessPiece(ChessPieceType.Bishop, ChessPlayer.White)
					3 -> ChessPiece(ChessPieceType.Queen, ChessPlayer.White)
					4 -> ChessPiece(ChessPieceType.King, ChessPlayer.White)
					5 -> ChessPiece(ChessPieceType.Bishop, ChessPlayer.White)
					6 -> ChessPiece(ChessPieceType.Knight, ChessPlayer.White)
					7 -> ChessPiece(ChessPieceType.Rook, ChessPlayer.White)
					else -> null
				}
				1 -> ChessPiece(ChessPieceType.Pawn, ChessPlayer.White)
				6 -> ChessPiece(ChessPieceType.Pawn, ChessPlayer.Black)
				7 -> when (x) {
					0 -> ChessPiece(ChessPieceType.Rook, ChessPlayer.Black)
					1 -> ChessPiece(ChessPieceType.Knight, ChessPlayer.Black)
					2 -> ChessPiece(ChessPieceType.Bishop, ChessPlayer.Black)
					3 -> ChessPiece(ChessPieceType.Queen, ChessPlayer.Black)
					4 -> ChessPiece(ChessPieceType.King, ChessPlayer.Black)
					5 -> ChessPiece(ChessPieceType.Bishop, ChessPlayer.Black)
					6 -> ChessPiece(ChessPieceType.Knight, ChessPlayer.Black)
					7 -> ChessPiece(ChessPieceType.Rook, ChessPlayer.Black)
					else -> null
				}
				else -> null
			}
		}),
		override var currentPlayer: ChessPlayer = ChessPlayer.White,
		override val players: List<ChessPlayer> = listOf(ChessPlayer.White, ChessPlayer.Black)
) : BoardGameState<ChessPiece?, ChessAction, ChessPlayer>, AIPlayable<ChessAction> {

	override fun possibleActions(): List<ChessAction> {
		val actions = mutableListOf<ChessAction>()
		for (i in 0 until 8) {
			for (j in 0 until 8) {
				val piece = board[i, j]
				if (piece?.player != currentPlayer)
					continue
				actions.addAll(piece.possibleMoves(board, Position(i, j)). filter {
					val newState = Chess(this).copyState()
					val actionThing = ChessActionMove.readyAction(this, it).onFailure { return@filter true }
					val sas = StateActionState(this, actionThing, newState)
					sas.movePiece()
					return@filter sas.kingMustNotBeInCheck() is Success
				})
			}
		}
		return actions
	}

	override fun findWinner(): ChessPlayer? {
		if(possibleActions().isNotEmpty())
			return null
		return if (currentPlayer == ChessPlayer.Black) ChessPlayer.White else ChessPlayer.Black
	}
}
