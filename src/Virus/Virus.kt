import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min

class Virus(override var state: VirusState = VirusState())
	: BoardGame<VirusState, Int, VirusAction, Int>() {

	override fun copyState(): VirusState {
		return VirusState(state.width, state.height, state.playerCount, state.board.copy(), state.currentPlayer, state.players)
	}

	override val actionTypes = listOf(
			ActionType("move piece",
					{ _, _ -> true },
					{ _: VirusState, action: VirusAction -> Success(action) },
					listOf<ActionStep<VirusState, VirusAction>>(
							VirusSas::originMustBeWithinBoard,
							VirusSas::originMustBeCurrentPlayer,
							VirusSas::destinationMustBeWithinBoard,
							VirusSas::destinationMustBeEmpty,
							VirusSas::mustNotMoveTooFar,
							VirusSas::movePiece,
							VirusSas::turnNeighbours,
							VirusSas::changePlayer
					)
			)
	)
}

private typealias VirusSas = StateActionState<VirusState, VirusAction>

fun VirusSas.destinationMustBeWithinBoard() =
		Result.check("destination must be within board", oldState.board.isWithinBounds(action.destination))

fun VirusSas.originMustBeWithinBoard() =
		Result.check("origin must be within board", oldState.board.isWithinBounds(action.origin))

fun VirusSas.originMustBeCurrentPlayer() =
		Result.check("must move own piece", oldState.board[action.origin] == oldState.currentPlayer)

fun VirusSas.destinationMustBeEmpty() =
		Result.check("destination must be empty", oldState.board[action.destination] == 0)

fun VirusSas.mustNotMoveTooFar() =
		Result.check("must not move too far", abs(action.origin.x - action.destination.x) <= 2 && abs(action.origin.y - action.destination.y) <= 2)

fun VirusSas.movePiece(): Result<Any?> {
	with(action){
		if (abs(origin.x - destination.x) > 1 || abs(origin.y - destination.y) > 1)
			newState.board[origin.x, origin.y] = 0
		newState.board[destination.x, destination.y] = oldState.currentPlayer
		return Result.success()
	}
}

fun VirusSas.turnNeighbours(): Result<Any?> {
	for (n in max(0, action.destination.x - 1)..min(oldState.width - 1, action.destination.x + 1)) {
		for (m in max(0, action.destination.y - 1)..min(oldState.height - 1, action.destination.y + 1)) {
			if (newState.board[n, m] != 0)
				newState.board[n, m] = oldState.currentPlayer
		}
	}
	return Result.success()
}

fun VirusSas.changePlayer(): Result<Any?> {
	val movablePlayers = newState.findMovablePlayers()
	var nextPlayer = oldState.currentPlayer + 1
	if (movablePlayers.none { it }) {
		nextPlayer = 0
	} else {
		if (nextPlayer > oldState.playerCount)
			nextPlayer = 1
		while (!movablePlayers[nextPlayer]) {
			nextPlayer++
			if (nextPlayer > oldState.playerCount)
				nextPlayer = 1
		}
	}
	newState.currentPlayer = nextPlayer
	return Result.success()
}

data class VirusAction(val origin: Position, val destination: Position)
