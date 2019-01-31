data class EldremState(
		override val board: Grid<EldremPiece?> = Grid(3, 3, { _, _ -> null }),
		override var currentPlayer: EldremPiece = EldremPiece.Cross,
		override val players: List<EldremPiece> = listOf(EldremPiece.Cross, EldremPiece.Circle)
) : BoardGameState<EldremPiece?, EldremAction, EldremPiece>, AIPlayable<EldremAction> {

	override fun possibleActions(): List<EldremAction> {
		val actions = mutableListOf<EldremAction>()
		for (i in 0..2)
			for (j in 0..2)
				if (board[i, j] == null)
					actions.add(EldremAction(currentPlayer, i, j))
		return actions.toList()
	}

	override fun findWinner(): EldremPiece? {
		if (hasPieceWon(EldremPiece.Cross))
			return EldremPiece.Cross
		else if (hasPieceWon(EldremPiece.Circle))
			return EldremPiece.Circle
		return null
	}

	private fun hasPieceWon(piece: EldremPiece): Boolean {
		if ((board[0, 0] == piece && board[0, 1] == piece && board[0, 2] == piece) ||
				(board[1, 0] == piece && board[1, 1] == piece && board[1, 2] == piece) ||
				(board[2, 0] == piece && board[2, 1] == piece && board[2, 2] == piece))
			return true
		if ((board[0, 0] == piece && board[1, 0] == piece && board[2, 0] == piece) ||
				(board[0, 1] == piece && board[1, 1] == piece && board[2, 1] == piece) ||
				(board[0, 2] == piece && board[1, 2] == piece && board[2, 2] == piece))
			return true
		if ((board[0, 0] == piece && board[1, 1] == piece && board[2, 2] == piece) ||
				(board[0, 2] == piece && board[1, 1] == piece && board[2, 0] == piece))
			return true
		return false
	}
}
