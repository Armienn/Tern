class Eldrem(override var state: EldremState = EldremState())
	: BoardGame<EldremState, EldremField, EldremAction, Int>() {

	override fun copyState(): EldremState {
		return EldremState(state.width, state.height, state.playerCount, state.board.copy(), state.currentPlayer, state.players)
	}

	override val actionTypes = listOf(
			ActionType("move piece",
					{ _, action: EldremAction ->
						action.actionType == EldremActionType.Move
					},
					EldremMoveAction.Companion::readyAction,
					listOf<ActionStep<EldremState, EldremMoveAction>>(
							EldremSas<EldremMoveAction>::mustPlaceOwnPiece,
							EldremSas<EldremMoveAction>::mustNotMoveTooFar,
							EldremSas<EldremMoveAction>::movePiece,
							EldremSas<EldremMoveAction>::changePlayer
					)
			)
	)

	companion object {
		private val statsMap = mapOf(
				EldremPieceType.Healer to EldremPieceStats(3, 3, 1, 2),
				EldremPieceType.Soldier to EldremPieceStats(3, 3, 1, 1)
		)

		fun statsFor(type: EldremPieceType) = statsMap[type] ?: throw Exception("Non-existing piece type")
	}
}

fun EldremSas<EldremMoveAction>.mustPlaceOwnPiece() = with(action) {
	Result.check("must place own piece", piece.player == oldState.currentPlayer)
}

fun EldremSas<EldremMoveAction>.mustNotMoveTooFar() = with(action) {
	Result.check("must not move too far", origin.position.hexDistance(destination.position) <= Eldrem.statsFor(piece.type).movement)
}

fun EldremSas<EldremMoveAction>.movePiece() = with(action) {
	if (destination.field.piece != null)
		return@with Failure<Any?>("must place pieces on empty fields")
	newState.board[destination.position] = destination.field.copy(piece = piece)
	newState.board[origin.position] = origin.field.copy(piece = null)
	Result.success()
}

fun EldremSas<EldremMoveAction>.changePlayer() = with(action) {
	var nextPlayer = oldState.currentPlayer + 1
	if (nextPlayer >= oldState.playerCount)
		nextPlayer = 0
	newState.currentPlayer = nextPlayer
	Result.success()
}

private typealias EldremSas<T> = StateActionState<EldremState, T>

class EldremMoveAction(
		val piece: EldremPiece,
		val origin: PositionedField<EldremField>,
		val destination: PositionedField<EldremField>
) {
	companion object {
		fun readyAction(oldState: EldremState, action: EldremAction): Result<EldremMoveAction> {
			if (!oldState.board.isWithinBounds(action.origin))
				return Failure("blabla")
			if (!oldState.board.isWithinBounds(action.destination))
				return Failure("blabla")
			val piece = oldState.board[action.origin].piece
					?: return Failure("origin doesn't have a piece")
			return Success(EldremMoveAction(piece,
					PositionedField(action.origin, oldState.board[action.origin]),
					PositionedField(action.destination, oldState.board[action.destination])))
		}
	}
}

data class EldremField(val terrain: EldremTerrain, val piece: EldremPiece?)
enum class EldremTerrain { Plains, Cliffs }
data class EldremPiece(
		val player: Int,
		val type: EldremPieceType,
		val remainingHealth: Int = Eldrem.statsFor(type).health,
		val hasMoved: Boolean = false,
		val hasAttacked: Boolean = false)
enum class EldremPieceType { Soldier, Healer }
data class EldremPieceStats(val movement: Int, val health: Int, val strength: Int, val range: Int)

class EldremAction(val actionType: EldremActionType, val origin: Position, val destination: Position)
enum class EldremActionType { Move, Attack, EndTurn }