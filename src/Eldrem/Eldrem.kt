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
							EldremSas<EldremMoveAction>::mustUseOwnPiece,
							EldremSas<EldremMoveAction>::mustNotMoveTooFar,
							EldremSas<EldremMoveAction>::movePiece
					)
			),
			ActionType("attack with piece",
					{ _, action: EldremAction ->
						action.actionType == EldremActionType.Attack
					},
					EldremAttackAction.Companion::readyAction,
					listOf<ActionStep<EldremState, EldremAttackAction>>(
							EldremSas<EldremAttackAction>::mustUseOwnPiece,
							EldremSas<EldremAttackAction>::mustAttackOpponent,
							EldremSas<EldremAttackAction>::mustAttackWithinRange,
							EldremSas<EldremAttackAction>::movePiece
					)
			),
			ActionType("end turn",
					{ _, action: EldremAction ->
						action.actionType == EldremActionType.EndTurn
					},
					EldremEndAction.Companion::readyAction,
					listOf<ActionStep<EldremState, EldremEndAction>>(
							EldremSas<EldremEndAction>::changePlayer
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

private fun <A: EldremMoveAction> EldremSas<A>.mustUseOwnPiece() = with(action) {
	Result.check("must use own piece", piece.player == oldState.currentPlayer)
}

private fun EldremSas<EldremAttackAction>.mustAttackOpponent() = with(action) {
	Result.check("must use own piece", opponent.player != oldState.currentPlayer)
}

private fun <A: EldremMoveAction> EldremSas<A>.mustNotMoveTooFar() = with(action) {
	Result.check("must not move too far", origin.position.hexDistance(destination.position) <= Eldrem.statsFor(piece.type).movement)
}

private fun <A: EldremMoveAction> EldremSas<A>.mustAttackWithinRange() = with(action) {
	Result.check("must attack within range", origin.position.hexDistance(destination.position) <= Eldrem.statsFor(piece.type).range)
}

private fun <A: EldremMoveAction> EldremSas<A>.movePiece() = with(action) {
	if (destination.field.piece != null)
		return@with Failure<Any?>("must place pieces on empty fields")
	newState.board[destination.position] = destination.field.copy(piece = piece)
	newState.board[origin.position] = origin.field.copy(piece = null)
	Result.success()
}

private fun EldremSas<EldremEndAction>.changePlayer() = with(action) {
	var nextPlayer = oldState.currentPlayer + 1
	if (nextPlayer >= oldState.playerCount)
		nextPlayer = 0
	newState.currentPlayer = nextPlayer
	Result.success()
}

private typealias EldremSas<T> = StateActionState<EldremState, T>

class EldremAttackAction(
		piece: EldremPiece,
		val opponent: EldremPiece,
		origin: PositionedField<EldremField>,
		destination: PositionedField<EldremField>
): EldremMoveAction(piece, origin, destination) {
	companion object {
		fun readyAction(oldState: EldremState, action: EldremAction): Result<EldremAttackAction> {
			if (!oldState.board.isWithinBounds(action.origin))
				return Failure("blabla")
			if (!oldState.board.isWithinBounds(action.destination))
				return Failure("blabla")
			val piece = oldState.board[action.origin].piece
					?: return Failure("origin doesn't have a piece")
			val opponent = oldState.board[action.destination].piece
					?: return Failure("destination doesn't have a piece")
			return Success(EldremAttackAction(piece, opponent,
					PositionedField(action.origin, oldState.board[action.origin]),
					PositionedField(action.destination, oldState.board[action.destination])))
		}
	}
}

open class EldremMoveAction(
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

private class EldremEndAction {
	companion object {
		fun readyAction(oldState: EldremState, action: EldremAction): Result<EldremEndAction> {
			return Success(EldremEndAction())
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