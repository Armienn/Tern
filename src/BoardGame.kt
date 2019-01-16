import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min

abstract class BoardGame <S : BoardGameState<T, A, P>, T, A, P> {
    abstract var state: S
    val players: MutableMap<P, String> = mutableMapOf()
    var winner: String? = null

    fun performAction(action: A): Boolean {
        if(!state.isLegal(action))
            return false
        state = state.nextState(action) as S
        winner = players[state.findWinner()]
        return true
    }

    fun currentPlayer(): String? = players[state.currentPlayer]

/*    fun initializeGame()
    fun isLegal(action: A): Boolean
    fun nextState(action: A, skipLegalCheck: Boolean = false): S?
    fun findWinner(): String?*/
}

interface BoardGameState <T, A, P> {
    val board: SquareGrid<T>
    val currentPlayer: P
    val players: List<P>

    fun isLegal(action: A): Boolean
    fun possibleActions(): List<A>
    fun nextState(action: A): BoardGameState <T, A, P>
    fun findWinner(): P?
}
