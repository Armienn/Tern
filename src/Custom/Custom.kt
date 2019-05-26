class Custom(override var state: CustomState = CustomState(), val rules: String = "TODO")
	: BoardGame<CustomState, CustomField, CustomAction, Int>() {

	override fun copyState(): CustomState {
		return CustomState(state.width, state.height, state.playerCount, state.board.copy(), state.currentPlayer, state.players)
	}

	override val actionTypes = listOf(
			ActionType("move piece",
					{ _, action: CustomAction ->
						action.actionType == CustomActionType.Move
					},
					{ oldState: CustomState , action: CustomAction, newState: CustomState ->
						performAction(oldState, action, newState)
					}
			)
	)

	fun performAction(oldState: CustomState, action: CustomAction, newState: CustomState): Result<*> {
		/*
		for(variable in variables)
			variable.ready(oldState, action)

		for (step in updateSteps)
			step(sas).onFailure { return it }
		return Result.success()

		for (step in steps)
			step(oldState, action, newState, variables).onFailure { return it }*/
		return Failure<Any?>("bla")
	}

	companion object {
		private val statsMap = mapOf(
				CustomPieceType.Healer to CustomPieceStats(3, 3, 1, 2),
				CustomPieceType.Soldier to CustomPieceStats(3, 3, 1, 1)
		)

		fun statsFor(type: CustomPieceType) = statsMap[type] ?: throw Exception("Non-existing piece type")
	}
}

fun performMoveAction(oldState: CustomState, action: CustomAction, newState: CustomState): Result<*> {
	val origin = prepareOrigin(action.origin, oldState.board).onFailure { return it }
	val destination = prepareDestination(action.destination, oldState.board).onFailure { return it }
	val piece = oldState.board[action.origin].piece ?: return Failure<Any>("origin must contain a piece")
	Result.check("must use own piece",
			piece.player == oldState.currentPlayer
	).onFailure { return it }
	Result.check("must not move too far",
			origin.position.hexDistance(destination.position) <= Custom.statsFor(piece.type).movement
	).onFailure { return it }
	movePiece(newState, piece, origin, destination).onFailure { return it }
	return Result.success()
}

private fun movePiece(newState: CustomState, piece: CustomPiece, origin: PositionedField<CustomField>, destination: PositionedField<CustomField>): Result<*> {
	if (destination.field.piece != null)
		return Failure<Any>("must place pieces on empty fields")
	newState.board[destination.position] = destination.field.copy(piece = piece)
	newState.board[origin.position] = origin.field.copy(piece = null)
	return Result.success()
}



data class CustomField(val terrain: CustomTerrain, val piece: CustomPiece?)
enum class CustomTerrain { Plains, Cliffs }
data class CustomPiece(
		val player: Int,
		val type: CustomPieceType,
		val remainingHealth: Int = Custom.statsFor(type).health,
		val hasMoved: Boolean = false,
		val hasAttacked: Boolean = false)

enum class CustomPieceType { Soldier, Healer }
data class CustomPieceStats(val movement: Int, val health: Int, val strength: Int, val range: Int)

class CustomAction(val actionType: CustomActionType, val origin: Position, val destination: Position)
enum class CustomActionType { Move, Attack, EndTurn }