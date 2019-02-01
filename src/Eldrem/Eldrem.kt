class Eldrem(override var state: EldremState = EldremState())
	: BoardGame<EldremState, EldremField, EldremAction, Int>() {

	override fun copyState(): EldremState {
		return EldremState(state.width, state.height, state.playerCount, state.board.copy(), state.currentPlayer, state.players)
	}

	override val actionTypes = listOf(
			ActionType("move piece",
					{ _, action ->
						action.actionType == EldremActionType.Move
					},
					EldremSasMove.Companion::readyAction,
					listOf<ActionStep<EldremSasMove>>(
							EldremSasMove::mustPlaceOwnPiece,
							EldremSasMove::movePiece,
							EldremSasMove::changePlayer
					)
			)
	)
}

private typealias EldremSas = StandardStateActionState<EldremState, EldremAction>

fun EldremSasMove.mustPlaceOwnPiece() =
		Result.check("must place own piece", piece.player == oldState.currentPlayer)

fun EldremSasMove.movePiece(): Result<Any?> {
	if (destination.field.piece != null)
		return Failure("must place pieces on empty fields")
	newState.board[destination.position] = destination.field.copy(piece = piece)
	newState.board[origin.position] = origin.field.copy(piece = null)
	return Result.success()
}

fun EldremSasMove.changePlayer(): Result<Any?> {
	var nextPlayer = oldState.currentPlayer + 1
	if (nextPlayer >= oldState.playerCount)
		nextPlayer = 0
	newState.currentPlayer = nextPlayer
	return Result.success()
}

class EldremSasMove(
		val piece: EldremPiece,
		val origin: PositionedField<EldremField>,
		val destination: PositionedField<EldremField>,
		oldState: EldremState,
		newState: EldremState
) : StateActionState<EldremState>(oldState, newState) {
	companion object {
		fun readyAction(oldState: EldremState, action: EldremAction, newState: EldremState): Result<EldremSasMove> {
			if (!oldState.board.isWithinBounds(action.origin))
				return Failure("blabla")
			if (!oldState.board.isWithinBounds(action.destination))
				return Failure("blabla")
			val piece = oldState.board[action.origin].piece
					?: return Failure("origin doesn't have a piece")
			return Success(EldremSasMove(piece,
					PositionedField(action.origin, oldState.board[action.origin]),
					PositionedField(action.destination, oldState.board[action.destination]),
					oldState, newState))
		}
	}
}

data class EldremField(val terrain: EldremTerrain, val piece: EldremPiece?)
data class EldremPiece(val player: Int, val type: String)
enum class EldremTerrain { Plains, Cliffs }

class EldremAction(val actionType: EldremActionType, val origin: Position, val destination: Position)
enum class EldremActionType { Move, Attack, EndTurn }