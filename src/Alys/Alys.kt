import kotlin.math.min

class Alys(override var state: AlysState = AlysState())
	: BoardGame<AlysState, AlysField?, AlysAction, Int>() {

	override fun copyState(): AlysState {
		return AlysState(state.width, state.height, state.playerCount, state.board.copy(), state.currentPlayer, state.players, state.round)
	}

	override val actionTypes = listOf(
			ActionType("build fort",
					{ _, action ->
						action is AlysCreateAction && action.type == AlysType.Fort
					},
					BuildAction.Companion::readyAction,
					listOf<ActionStep<AlysState, BuildAction>>(
							AlysSas<BuildAction>::originMustBeCurrentPlayer,
							AlysSas<BuildAction>::originAndDestinationMustBeDifferent,
							AlysSas<BuildAction>::originAndDestinationMustConnected,
							AlysSas<BuildAction>::destinationMustBeCurrentPlayer,
							AlysSas<BuildAction>::destinationMustBeEmpty,
							AlysSas<BuildAction>::subtractMoney,
							AlysSas<BuildAction>::placePiece
					)
			),
			ActionType("hire and move soldier",
					{ state, action ->
						action is AlysCreateAction && action.type == AlysType.Soldier && state.board[action.destination]?.player == state.currentPlayer
					},
					HireAction.Companion::readyAction,
					listOf<ActionStep<AlysState, HireAction>>(
							AlysSas<HireAction>::originMustBeCurrentPlayer,
							AlysSas<HireAction>::originAndDestinationMustBeDifferent,
							AlysSas<HireAction>::originAndDestinationMustConnected,
							AlysSas<HireAction>::subtractMoneyForSoldier,
							AlysSas<HireAction>::destinationMustNotBeFortOrTown,
							AlysSas<HireAction>::destinationMustNotBeFullyUpgradedSoldier,
							AlysSas<HireAction>::placeOrUpgradePiece,
							AlysSas<HireAction>::removeOriginalPiece
					)
			),
			ActionType("hire soldier and invade",
					{ state, action ->
						action is AlysCreateAction && action.type == AlysType.Soldier && state.board[action.destination]?.player != state.currentPlayer
					},
					HireAction.Companion::readyAction,
					listOf<ActionStep<AlysState, HireAction>>(
							AlysSas<HireAction>::originMustBeCurrentPlayer,
							AlysSas<HireAction>::originAndDestinationMustBeDifferent,
							AlysSas<HireAction>::originAndDestinationMustConnected,
							AlysSas<HireAction>::subtractMoneyForSoldier,
							AlysSas<HireAction>::pieceMustBeStronger,
							AlysSas<HireAction>::invadeDestination,
							AlysSas<HireAction>::removeOriginalPiece,
							AlysSas<HireAction>::fixSplitAreas,
							AlysSas<HireAction>::fixMergedAreas
					)
			),
			ActionType("move soldier",
					{ state, action ->
						action is AlysMoveAction && state.board[action.destination]?.player == state.currentPlayer
					},
					MoveAction.Companion::readyAction,
					listOf<ActionStep<AlysState, MoveAction>>(
							AlysSas<MoveAction>::originMustBeCurrentPlayer,
							AlysSas<MoveAction>::originAndDestinationMustBeDifferent,
							AlysSas<MoveAction>::originAndDestinationMustConnected,
							AlysSas<MoveAction>::pieceMustBeSoldier,
							AlysSas<MoveAction>::pieceMustNotHaveMoved,
							AlysSas<MoveAction>::destinationMustNotBeFortOrTown,
							AlysSas<MoveAction>::destinationMustNotBeFullyUpgradedSoldier,
							AlysSas<MoveAction>::placeOrUpgradePiece,
							AlysSas<MoveAction>::removeOriginalPiece
					)
			),
			ActionType("invade",
					{ state, action ->
						action is AlysMoveAction && state.board[action.destination]?.player != state.currentPlayer
					},
					MoveAction.Companion::readyAction,
					listOf<ActionStep<AlysState, MoveAction>>(
							AlysSas<MoveAction>::originMustBeCurrentPlayer,
							AlysSas<MoveAction>::originAndDestinationMustBeDifferent,
							AlysSas<MoveAction>::originAndDestinationMustConnected,
							AlysSas<MoveAction>::pieceMustBeSoldier,
							AlysSas<MoveAction>::pieceMustNotHaveMoved,
							AlysSas<MoveAction>::pieceMustBeStronger,
							AlysSas<MoveAction>::invadeDestination,
							AlysSas<MoveAction>::removeOriginalPiece,
							AlysSas<MoveAction>::fixSplitAreas,
							AlysSas<MoveAction>::fixMergedAreas
					)
			),
			ActionType("end turn",
					{ _, action ->
						action is AlysEndTurnAction
					},
					EndAction.Companion::readyAction,
					listOf<ActionStep<AlysState, EndAction>>(
							AlysSas<EndAction>::changeCurrentPlayer,
							AlysSas<EndAction>::incrementRound,
							AlysSas<EndAction>::gainIncome,
							AlysSas<EndAction>::spreadTrees,
							AlysSas<EndAction>::spreadCoastTrees,
							AlysSas<EndAction>::overgrowGraves,
							AlysSas<EndAction>::killLoneSoldiers,
							AlysSas<EndAction>::subtractUpkeep
					)
			)
	)

	companion object {
		fun priceOf(type: AlysType): Int {
			return when (type) {
				AlysType.Soldier -> 10
				AlysType.Fort -> 15
				else -> 0
			}
		}

		fun upkeepFor(piece: AlysPiece): Int {
			if (piece.type != AlysType.Soldier)
				return 0
			return upkeepFor(piece.strength)
		}

		fun upkeepFor(strength: Int): Int {
			return when (strength) {
				1 -> 2
				2 -> 6
				3 -> 18
				4 -> 54
				else -> 0
			}
		}
	}

	fun newGame(width: Int = 15, height: Int = 15, seed: Int = 1) {
		val creator = AlysBoardCreator(width, height, seed)
		creator.generateLand()
		creator.fillBoard(players.size)
		this.state = AlysState(width, height, players.size, creator.board, 1, (1..players.size).toList())
	}
}

private fun <A : StandardAction> AlysSas<A>.originAndDestinationMustBeDifferent() = with(action) {
		Result.check("origin and destination must be different", origin.position != destination.position)
}

private fun <A : StandardAction> AlysSas<A>.originAndDestinationMustConnected() = with(action) {
		Result.check("origin and destination must connected", oldState.isConnected(origin.position, destination.position))
}

private fun <A : StandardAction> AlysSas<A>.originMustBeCurrentPlayer() = with(action) {
		Result.check("origin must be current player", origin.field.player == oldState.currentPlayer)
}

private fun <A : StandardAction> AlysSas<A>.destinationMustBeCurrentPlayer() = with(action) {
		Result.check("destination must be current player", destination.field.player == oldState.currentPlayer)
}

private fun <A : StandardAction> AlysSas<A>.destinationMustBeEmpty() = with(action) {
		Result.check("destination must be empty", destination.field.piece == null && destination.field.treasury == null)
}

private fun <A : StandardAction> AlysSas<A>.destinationMustNotBeFortOrTown() = with(action) {
		Result.check("destination must not be fort or town", destination.field.piece?.type != AlysType.Fort && destination.field.treasury == null)
}

private fun <A : StandardAction> AlysSas<A>.destinationMustNotBeFullyUpgradedSoldier() = with(action) {
		Result.check("destination must not be fully upgraded soldier", !(destination.field.piece?.type == AlysType.Soldier && destination.field.piece.strength == 4))
}

private fun <A : MoveAction> AlysSas<A>.pieceMustNotHaveMoved() =with(action) {
		Result.check("piece must not have moved", !piece.hasMoved)
}

private fun <A : MoveAction> AlysSas<A>.pieceMustBeSoldier() =with(action) {
		Result.check("piece must be soldier", piece.type == AlysType.Soldier)
}

private fun <A : MoveAction> AlysSas<A>.pieceMustBeStronger() = with(action) {
	Result.check("piece must be stronger", piece.strength > oldState.totalDefenseOf(destination))
}

private fun <A : MoveAction> AlysSas<A>.placeOrUpgradePiece() = with(action) {
	val destinationPiece = destination.field.piece
	when {
		destinationPiece == null ->
			newState.board[destination.position] = destination.field.copy(piece = piece.copy())
		destinationPiece.type == AlysType.Soldier ->
			newState.board[destination.position] = destination.field.copy(piece =
			destinationPiece.copy(strength = min(4, destinationPiece.strength + piece.strength)))
		else ->
			newState.board[destination.position] = destination.field.copy(piece = piece.copy(hasMoved = true))
	}
	Result.success()
}

private fun <A : MoveAction> AlysSas<A>.removeOriginalPiece() = with(action) {
	newState.board[origin.position] = newState.board[origin.position]?.copy(piece = null)
	Result.success()
}

private fun <A : MoveAction> AlysSas<A>.invadeDestination() = with(action) {
	newState.board[destination.position] = AlysField(oldState.currentPlayer, piece.copy(hasMoved = true))
	Result.success()
}

private fun <A : MoveAction> AlysSas<A>.fixSplitAreas() = with(action) {
	for (place in newState.adjacentFields(destination.position)) {
		val area = newState.connectedPositions(place.position)
		if (area.size == 1) {
			newState.board[place.position] = place.field.copy(treasury = null)
			continue
		}
		if (area.any { it.field.treasury != null })
			continue
		val emptyArea = area.filter { it.field.piece?.type != AlysType.Soldier && it.field.piece?.type != AlysType.Fort }
		val newBase = if (emptyArea.isEmpty()) area.random() else emptyArea.random()
		newState.board[newBase.position] = AlysField(newBase.field.player, treasury = 0)
	}
	Result.success()
}

private fun <A : MoveAction> AlysSas<A>.fixMergedAreas() = with(action) {
	val area = newState.connectedPositions(destination.position)
	val bases = area.filter { it.field.treasury != null }
	val treasury = bases.sumBy { it.field.treasury ?: 0 }
	val biggestBase = bases.maxBy { it.field.treasury ?: 0 } ?: return@with Failure<Any?>("There was no base? This shouldn't happen")
	for (base in bases)
		newState.board[base.position] = base.field.copy(treasury = null)
	newState.board[biggestBase.position] = biggestBase.field.copy(treasury = treasury)
	Result.success()
}

private fun AlysSas<BuildAction>.subtractMoney() = with(action) {
	if (treasury < Alys.priceOf(type))
		return@with Failure<Any?>("not enough money")
	newState.board[origin.position] = origin.field.copy(treasury = treasury - Alys.priceOf(type))
	Result.success()
}

private fun AlysSas<HireAction>.subtractMoneyForSoldier() = with(action) {
	if (treasury < Alys.priceOf(AlysType.Soldier))
		return@with Failure<Any?>("not enough money")
	newState.board[origin.position] = origin.field.copy(treasury = treasury - Alys.priceOf(AlysType.Soldier))
	Result.success()
}

private fun AlysSas<BuildAction>.placePiece() = with(action) {
	newState.board[destination.position] = destination.field.copy(piece = AlysPiece(type))
	Result.success()
}

private fun AlysSas<EndAction>.changeCurrentPlayer() = with(action) {
	newState.currentPlayer = player
	Result.success()
}

private fun AlysSas<EndAction>.incrementRound(): Result<Any?> {
	if (newState.currentPlayer < oldState.currentPlayer)
		newState.round = oldState.round + 1
	return Result.success()
}

private fun AlysSas<EndAction>.gainIncome() = with(action) {
	for (base in bases) {
		val treasury = (base.field.treasury as Int) + oldState.incomeFor(base.position)
		newState.board[base.position] = base.field.copy(treasury = treasury)
	}
	Result.success()
}

private fun AlysSas<EndAction>.spreadTrees() = with(action) {
	val newTrees = mutableListOf<Position>()
	for (place in playerArea)
		if (place.field.piece == null && place.field.treasury == null)
			if (oldState.adjacentFields(place.position)
							.filter { it.field.piece?.type == AlysType.Tree }.size > 1)
				newTrees.add(place.position)
	for (position in newTrees)
		newState.board[position] = AlysField(player, AlysPiece(AlysType.Tree))
	Result.success()
}

private fun AlysSas<EndAction>.spreadCoastTrees() = with(action) {
	val newTrees = mutableListOf<Position>()
	for (place in playerArea)
		if (place.field.piece == null && place.field.treasury == null) {
			val adjacents = oldState.adjacentFields(place.position)
			if (adjacents.size < 6 && adjacents.any { it.field.piece?.type == AlysType.CoastTree })
				newTrees.add(place.position)
		}
	for (position in newTrees)
		newState.board[position] = AlysField(player, AlysPiece(AlysType.CoastTree))
	Result.success()
}

private fun AlysSas<EndAction>.overgrowGraves() = with(action) {
	for (place in playerArea.filter { it.field.piece?.type == AlysType.Grave }) {
		if (oldState.adjacentFields(place.position).size < 6)
			newState.board[place.position] = AlysField(player, AlysPiece(AlysType.CoastTree))
		else
			newState.board[place.position] = AlysField(player, AlysPiece(AlysType.Tree))
	}
	Result.success()
}

private fun AlysSas<EndAction>.killLoneSoldiers() = with(action) {
	for (place in playerArea.filter {
		it.field.piece?.type == AlysType.Soldier &&
				oldState.adjacentFields(it.position).none { it.field.player == player }
	})
		newState.board[place.position] = AlysField(player, AlysPiece(AlysType.Grave))
	Result.success()
}

private fun AlysSas<EndAction>.subtractUpkeep() = with(action) {
	for (base in bases) {
		val area = oldState.connectedPositions(base.position)
		val treasury = (base.field.treasury as Int) + area.filter {
			it.field.piece?.type != AlysType.Tree && it.field.piece?.type != AlysType.CoastTree
		}.size
		val soldiers = area.filter { it.field.piece?.type == AlysType.Soldier }
		for (soldier in soldiers)
			newState.board[soldier.position] = soldier.field.copy(piece = soldier.field.piece?.copy(hasMoved = false))
		val upkeep = soldiers.map { Alys.upkeepFor(it.field.piece as AlysPiece) }.sum()
		if (upkeep <= treasury)
			newState.board[base.position] = base.field.copy(treasury = treasury - upkeep)
		else
			for (soldier in soldiers)
				newState.board[soldier.position] = AlysField(player, AlysPiece(AlysType.Grave))
	}
	Result.success()
}

private typealias AlysSas<T> = StateActionState<AlysState, T>

private class EndAction (
		val playerArea: List<PositionedField<AlysField>>,
		val bases: List<PositionedField<AlysField>>,
		val player: Int
) {
	companion object {
		fun readyAction(oldState: AlysState, action: AlysAction): Result<EndAction> {
			action as AlysEndTurnAction
			var nextPlayer = oldState.currentPlayer + 1
			if (nextPlayer > oldState.playerCount)
				nextPlayer = 1
			val playerArea = oldState.board.positionedFields()
					.filter { it.field?.player == nextPlayer }
					.map { PositionedField(it.position, it.field as AlysField) }
			val bases = playerArea.filter { it.field.treasury != null }
			return Success(EndAction(playerArea, bases, nextPlayer))
		}
	}
}

private class BuildAction(
		val treasury: Int,
		val type: AlysType,
		base: StandardAction
) : StandardAction(base) {
	companion object {
		fun readyAction(oldState: AlysState, action: AlysAction): Result<BuildAction> {
			action as AlysCreateAction
			val base = StandardAction.readyAction(oldState, action.origin, action.destination).onFailure {
				return Failure(it.error)
			}
			val treasury = base.origin.field.treasury
					?: return Failure("origin isn't a base")
			return Success(BuildAction(treasury, action.type, base))
		}
	}
}

private class HireAction(
		override val piece: AlysPiece,
		val treasury: Int,
		base: StandardAction
) : MoveAction(piece, base) {
	companion object {
		fun readyAction(oldState: AlysState, action: AlysAction): Result<HireAction> {
			action as AlysCreateAction
			val base = StandardAction.readyAction(oldState, action.origin, action.destination).onFailure {
				return Failure(it.error)
			}
			val treasury = base.origin.field.treasury
					?: return Failure("origin isn't a base")
			return Success(HireAction(AlysPiece(AlysType.Soldier), treasury, base))
		}
	}
}

private open class MoveAction(
		open val piece: AlysPiece,
		base: StandardAction
) : StandardAction(base) {
	companion object {
		fun readyAction(oldState: AlysState, action: AlysAction): Result<MoveAction> {
			action as AlysMoveAction
			val base = StandardAction.readyAction(oldState, action.origin, action.destination).onFailure {
				return Failure(it.error)
			}
			val piece = base.origin.field.piece
					?: return Failure("origin doesn't have a piece")
			return Success(MoveAction(piece, base))
		}
	}
}

private open class StandardAction(
		val origin: PositionedField<AlysField>,
		val destination: PositionedField<AlysField>
) {
	constructor(base: StandardAction) : this(base.origin, base.destination)

	companion object {
		fun readyAction(oldState: AlysState, origin: Position, destination: Position): Result<StandardAction> {
			val originField = oldState.board[origin]
					?: return Failure("origin is empty")
			val destinationField = oldState.board[destination]
					?: return Failure("destination is empty")
			return Success(StandardAction(PositionedField(origin, originField), PositionedField(destination, destinationField)))
		}
	}
}

data class AlysField(val player: Int, val piece: AlysPiece? = null, val treasury: Int? = null)
data class AlysPiece(val type: AlysType, val strength: Int = 1, val hasMoved: Boolean = false)
enum class AlysType { Fort, Soldier, Grave, Tree, CoastTree }

interface AlysAction
data class AlysMoveAction(val origin: Position, val destination: Position) : AlysAction
data class AlysCreateAction(val type: AlysType, val origin: Position, val destination: Position) : AlysAction
class AlysEndTurnAction : AlysAction

