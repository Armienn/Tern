abstract class BoardGame<S : BoardGameState<T, A, P>, T, A, P> {
	abstract var state: S
	abstract val actionTypes: List<ActionType<S, A>>
	val players: MutableMap<P, Player<S, A>> = mutableMapOf()
	var winner: Player<S, A>? = null

	fun performAction(action: A): Result<*> {
		state = nextState(action).onFailure { return it }
		winner = players[state.findWinner()]
		return Result.success()
	}

	fun nextState(action: A): Result<S> {
		val actionType = (actionTypes.find { it.shouldPerform(state, action) }
				?: return Result.failure("Couldn't recognise action")) as ActionType<S, A>
		val newState = copyState()
		actionType.perform(state, action, newState).onFailure {
			return Failure("Couldn't ${actionType.description} - ${it.error}")
		}
		return Success(newState)
	}

	abstract fun copyState(): S

	fun currentPlayer() = players[state.currentPlayer]
}

interface BoardGameState<T, A, P> {
	val board: Grid<T>
	var currentPlayer: P
	val players: List<P>

	fun findWinner(): P?
}

class StateActionState<S, T>(val oldState: S, val action: T, val newState: S)

typealias ActionStep<S, T> = (StateActionState<S, T>) -> Result<Any?>

class ActionType<S, A>(
		val description: String,
		val shouldPerform: (state: S, action: A) -> Boolean,
		val perform: (oldState: S, action: A, newState: S) -> Result<*>
)

abstract class Result<T> {
	companion object {
		fun success(): Success<Any?>{
			return Success(null)
		}

		fun <F> failure(error: String): Failure<F>{
			return Failure(error)
		}

		fun check(error: String, result: Boolean): Result<Any?> {
			if(result)
				return Success(null)
			return Failure(error)
		}

		fun <A> verify(error: String, thing: A, check: (thing: A) -> Boolean): Result<A> {
			if(check(thing))
				return Success(thing)
			return Failure(error)
		}

		fun <A> verify(error: String, thing: A, check: Boolean): Result<A> {
			if(check)
				return Success(thing)
			return Failure(error)
		}
	}

	inline fun onFailure(callback: (result: Failure<T>)-> T): T {
		return if(this is Failure)
			callback(this)
		else
			(this as Success).value
	}
}
class Success<T>(val value: T) : Result<T>()
class Failure<T>(val error: String) : Result<T>()

class Rule<S, A>(val description: String, val isLegal: (action: A, state: S) -> Boolean)
