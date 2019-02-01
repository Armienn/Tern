import kotlin.math.abs

class Chess(override var state: ChessState = ChessState())
	: BoardGame<ChessState, ChessPiece?, ChessAction, ChessPlayer>() {

	override fun copyState(): ChessState {
		return ChessState(state.board.copy(), state.currentPlayer, state.players)
	}

	override val actionTypes = listOf(
			ActionType("move piece",
					{ _, _ -> true },
					ChessActionMove.Companion::readyAction,
					listOf<ActionStep<ChessState, ChessActionMove>>(
							ChessSas::originMustBeCurrentPlayer,
							ChessSas::destinationMustBeEmptyOrEnemy,
							ChessSas::moveMustBeLegal,
							ChessSas::movePiece,
							ChessSas::switchPlayer,
							ChessSas::kingMustNotBeInCheck
					)
			)
	)
}

private fun ChessSas.originMustBeCurrentPlayer() = with(action) {
	Result.check("must move own piece", piece.player == oldState.currentPlayer)
}

private fun ChessSas.destinationMustBeEmptyOrEnemy() = with(action) {
	Result.check("destination must be empty or enemy", destination.field == null || destination.field.player != oldState.currentPlayer)
}

private fun ChessSas.moveMustBeLegal() = with(action) {
	Result.check("move must be legal", piece.isLegal(oldState.board, action))
}
internal fun ChessSas.kingMustNotBeInCheck(): Result<Any?> {
	val index = newState.board.fields.indexOfFirst { it?.type == ChessPieceType.King && it.player == oldState.currentPlayer }
	val position = Position(index % 8, index / 8)
	return Result.check("king must not be in check", !ChessPiece.isInCheck(newState.board, position))
}

internal fun ChessSas.movePiece() = with(action) {
	var newPiece = piece.copy(hasMoved = true)
	if (newPiece.type == ChessPieceType.Pawn &&
			((action.destination.y == 0 && newPiece.player == ChessPlayer.Black) ||
			(action.destination.y == oldState.board.height - 1 && newPiece.player == ChessPlayer.White)))
		newPiece = newPiece.copy(type = ChessPieceType.Queen)
	if (newPiece.type == ChessPieceType.King && abs(action.origin.x - action.destination.x) == 2)
		moveCastlingRook(action, newState)
	newState.board[action.destination] = newPiece
	newState.board[action.origin] = null
	Result.success()
}

private fun moveCastlingRook(action: ChessAction, state: ChessState) {
	if (action.destination.x < 4) {
		state.board[action.destination.x + 1, action.origin.y] = state.board[0, action.origin.y]
		state.board[0, action.origin.y] = null
	} else {
		state.board[action.destination.x - 1, action.origin.y] = state.board[state.board.width - 1, action.origin.y]
		state.board[state.board.width - 1, action.origin.y] = null
	}
}

private fun ChessSas.switchPlayer(): Result<Any?> {
	newState.currentPlayer = if (oldState.currentPlayer == ChessPlayer.White) ChessPlayer.Black else ChessPlayer.White
	return Result.success()
}

private typealias ChessSas = StateActionState<ChessState, ChessActionMove>

class ChessActionMove(
		val piece: ChessPiece,
		val destination: PositionedField<ChessPiece?>,
		val action: ChessAction
)  {
	companion object {
		fun readyAction(oldState: ChessState, action: ChessAction): Result<ChessActionMove> {
			val originField = oldState.board[action.origin]
					?: return Failure("must move a piece")
			return Success(ChessActionMove(
					originField,
					PositionedField(action.destination, oldState.board[action.destination]),
					action))
		}
	}
}

data class ChessAction(val origin: Position, val destination: Position)

enum class ChessPieceType { King, Queen, Bishop, Knight, Rook, Pawn }
enum class ChessPlayer { White, Black }