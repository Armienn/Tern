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
					::performMoveAction
			),
			ActionType("attack with piece",
					{ _, action: EldremAction ->
						action.actionType == EldremActionType.Attack
					},
					::performAttackAction
			),
			ActionType("end turn",
					{ _, action: EldremAction ->
						action.actionType == EldremActionType.EndTurn
					},
					::performEndTurnAction
			)
	)

	companion object {
		private val statsMap = mapOf(
				EldremPieceType.Healer to EldremPieceStats(3, 3, 1, 2),
				EldremPieceType.Soldier to EldremPieceStats(3, 3, 1, 1)
		)

		fun statsFor(type: EldremPieceType) = statsMap[type] ?: throw Exception("Non-existing piece type")
	}
	private fun performMoveAction(oldState: EldremState, action: EldremAction, newState: EldremState): Result<*> {
		val origin = prepareOrigin(action.origin, oldState.board).onFailure { return it }
		val destination = prepareDestination(action.destination, oldState.board).onFailure { return it }
		val piece = oldState.board[action.origin].piece ?: return Failure<Any>("origin must contain a piece")
		Result.check("must use own piece",
				piece.player == oldState.currentPlayer
		).onFailure { return it }
		Result.check("must not move too far",
				origin.position.hexDistance(destination.position) <= Eldrem.statsFor(piece.type).movement
		).onFailure { return it }
		movePiece(newState, piece, origin, destination).onFailure { return it }
		return Result.success()
	}

	private fun performAttackAction(oldState: EldremState, action: EldremAction, newState: EldremState): Result<*> {
		val origin = prepareOrigin(action.origin, oldState.board).onFailure { return it }
		val destination = prepareDestination(action.destination, oldState.board).onFailure { return it }
		val piece = oldState.board[action.origin].piece ?: return Failure<Any>("origin must contain a piece")
		val opponent = oldState.board[action.destination].piece ?: return Failure<Any>("destination must contain a piece")
		Result.check("must use own piece",
				piece.player == oldState.currentPlayer
		).onFailure { return it }
		Result.check("must use own piece",
				opponent.player != oldState.currentPlayer
		).onFailure { return it }
		Result.check("must attack within range",
				origin.position.hexDistance(destination.position) <= Eldrem.statsFor(piece.type).range
		).onFailure { return it }
		movePiece(newState, piece, origin, destination).onFailure { return it }
		return Result.success()
	}

	private fun performEndTurnAction(oldState: EldremState, action: EldremAction, newState: EldremState): Result<*> {
		changePlayer(oldState, newState)
		return Result.success()
	}

	private fun movePiece(newState: EldremState, piece: EldremPiece, origin: PositionedField<EldremField>, destination: PositionedField<EldremField>): Result<*> {
		if (destination.field.piece != null)
			return Failure<Any>("must place pieces on empty fields")
		newState.board[destination.position] = destination.field.copy(piece = piece)
		newState.board[origin.position] = origin.field.copy(piece = null)
		return Result.success()
	}

	private fun changePlayer(oldState: EldremState, newState: EldremState) {
		var nextPlayer = oldState.currentPlayer + 1
		if (nextPlayer >= oldState.playerCount)
			nextPlayer = 0
		newState.currentPlayer = nextPlayer
	}
}

fun <T> prepareOrigin(position: Position, board: Grid<T>) =
		preparePosition("origin", position, board)

fun <T> prepareDestination(position: Position, board: Grid<T>) =
		preparePosition("destination", position, board)

fun <T> preparePosition(descriptor: String, position: Position, board: Grid<T>): Result<PositionedField<T>> {
	if(!board.isWithinBounds(position))
		return Failure("$descriptor must be within bounds")
	return Success(PositionedField(position, board[position]))
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