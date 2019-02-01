class TicTacToe(override var state: TicTacToeState = TicTacToeState())
	: BoardGame<TicTacToeState, TicTacToePiece?, TicTacToeAction, TicTacToePiece>() {

	override fun copyState(): TicTacToeState {
		return TicTacToeState(state.board.copy(), state.currentPlayer, state.players)
	}

	override val actionTypes = listOf(
			ActionType("place piece",
					{ _, _ -> true },
					{ _: TicTacToeState, action: TicTacToeAction -> Success(action)},
					listOf<ActionStep<TicTacToeState, TicTacToeAction>>(
							TicTacToeSas::mustPlaceOwnPiece,
							TicTacToeSas::placePiece,
							TicTacToeSas::switchPlayer
					)
			)
	)
}

private typealias TicTacToeSas = StateActionState<TicTacToeState, TicTacToeAction>

fun TicTacToeSas.mustPlaceOwnPiece() =
		Result.check("must place own piece", action.piece == oldState.currentPlayer)

fun TicTacToeSas.placePiece(): Result<Any?> {
	if (oldState.board[action.x, action.y] != null)
		Failure<Any?>("must place pieces on empty fields")
	newState.board[action.x, action.y] = action.piece
	return Result.success()
}

fun TicTacToeSas.switchPlayer(): Result<Any?> {
	newState.currentPlayer = if (oldState.currentPlayer == TicTacToePiece.Cross) TicTacToePiece.Circle else TicTacToePiece.Cross
	return Result.success()
}

enum class TicTacToePiece { Cross, Circle }
data class TicTacToeAction(val piece: TicTacToePiece, val x: Int, val y: Int)