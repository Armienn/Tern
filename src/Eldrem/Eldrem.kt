class Eldrem(override var state: EldremState = EldremState())
	: BoardGame<EldremState, EldremPiece?, EldremAction, EldremPiece>() {

	override fun copyState(): EldremState {
		return EldremState(state.board.copy(), state.currentPlayer, state.players)
	}

	override val actionTypes = listOf(
			ActionType("place piece",
					{ _, _ -> true },
					{ oldState: EldremState, action: EldremAction, newState: EldremState ->
						Success(StandardStateActionState(oldState, action, newState))
					},
					listOf<ActionStep<EldremSas>>(
							EldremSas::mustPlaceOwnPiece,
							EldremSas::placePiece,
							EldremSas::switchPlayer
					)
			)
	)
}

private typealias EldremSas = StandardStateActionState<EldremState, EldremAction>

fun EldremSas.mustPlaceOwnPiece() =
		Result.check("must place own piece", action.piece == oldState.currentPlayer)

fun EldremSas.placePiece(): Result<Any?> {
	if (oldState.board[action.x, action.y] != null)
		Failure<Any?>("must place pieces on empty fields")
	newState.board[action.x, action.y] = action.piece
	return Result.success()
}

fun EldremSas.switchPlayer(): Result<Any?> {
	newState.currentPlayer = if (oldState.currentPlayer == EldremPiece.Cross) EldremPiece.Circle else EldremPiece.Cross
	return Result.success()
}

enum class EldremPiece { Cross, Circle }
data class EldremAction(val piece: EldremPiece, val x: Int, val y: Int)