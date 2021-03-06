import kotlin.math.min

data class AlysState(
		val width: Int = 10, val height: Int = 10,
		val playerCount: Int = 4,
		override val board: Grid<AlysField?> = Grid(width, height, { x, y ->
			AlysField((1..playerCount).random())
		}),
		override var currentPlayer: Int = 1,
		override val players: List<Int> = (1..playerCount).toList(),
		var round: Int = 0
) : BoardGameState<AlysField?, AlysAction, Int>, AIPlayable<AlysAction> {

	override fun possibleActions(): List<AlysAction> {
		val actions = mutableListOf<AlysAction>()
		actions.add(AlysEndTurnAction())
		val bases = board.positions().filter { board[it]?.player == currentPlayer && board[it]?.treasury != null }
		for (base in bases)
			actions.addAll(possibleActionsFor(base))
		return actions.toList()
	}

	private fun possibleActionsFor(basePosition: Position): List<AlysAction> {
		val actions = mutableListOf<AlysAction>()
		val base = board[basePosition] as AlysField
		val area = connectedPositions(basePosition)
		actions.addAll(possibleCreateActionsFor(basePosition, base.treasury as Int, area))
		actions.addAll(possibleMoveActionsFor(area))
		return actions
	}

	private fun possibleCreateActionsFor(basePosition: Position, treasury: Int, area: List<PositionedField<AlysField>>): List<AlysAction> {
		val actions = mutableListOf<AlysAction>()
		if (treasury >= Alys.priceOf(AlysType.Fort))
			for (place in area.filter { it.field.piece == null && it.field.treasury == null })
				actions.add(AlysCreateAction(AlysType.Fort, basePosition, place.position))
		if (treasury >= Alys.priceOf(AlysType.Soldier))
			actions.addAll(possibleMoveActionsFor(
					PositionedField(basePosition, AlysField(0, AlysPiece(AlysType.Soldier, 1))),
					area.filter { it.field.piece?.type == AlysType.Soldier },
					area,
					neighbouringPositions(area))
					.map {
						it as AlysMoveAction
						AlysCreateAction(AlysType.Soldier, it.origin, it.destination)
					})
		return actions
	}

	private fun possibleMoveActionsFor(area: List<PositionedField<AlysField>>): List<AlysAction> {
		val actions = mutableListOf<AlysAction>()
		val soldiers = area.filter { it.field.piece?.type == AlysType.Soldier }
		for (soldier in soldiers.filterNot { (it.field.piece as AlysPiece).hasMoved })
			actions.addAll(possibleMoveActionsFor(soldier, soldiers.filter { it != soldier }, area, neighbouringPositions(area)))
		return actions
	}

	private fun possibleMoveActionsFor(
			soldier: PositionedField<AlysField>,
			otherSoldiers: List<PositionedField<AlysField>>,
			area: List<PositionedField<AlysField>>,
			neighbouringArea: List<PositionedField<AlysField>>
	): List<AlysAction> {
		val actions = mutableListOf<AlysAction>()
		if (soldier.field.piece?.strength == 1)
			for (otherSoldier in otherSoldiers.filter { (it.field.piece?.strength as Int) < 4 })
				actions.add(AlysMoveAction(soldier.position, otherSoldier.position))
		for (field in area.filter { it.field.piece?.type in listOf(AlysType.Tree, AlysType.Grave, AlysType.CoastTree) })
			actions.add(AlysMoveAction(soldier.position, field.position))
		for (field in neighbouringArea.filter { totalDefenseOf(it) < soldier.field.piece?.strength as Int })
			actions.add(AlysMoveAction(soldier.position, field.position))
		return actions
	}

	override fun findWinner(): Int? {
		var remainingPlayer: Int? = null
		for (field in board.fields.filterNotNull()) {
			if (field.treasury == null)
				continue
			val player = field.player
			if (remainingPlayer == null)
				remainingPlayer = player
			else if (remainingPlayer != player)
				return null
		}
		return remainingPlayer
	}

	fun defenseOf(field: AlysField): Int {
		if (field.piece?.type == AlysType.Soldier)
			return min(field.piece.strength, 3)
		if (field.piece?.type == AlysType.Fort)
			return 2
		if (field.treasury != null)
			return 1
		return 0
	}

	fun totalDefenseOf(place: PositionedField<AlysField>): Int {
		var defense = defenseOf(place.field)
		val defenses = adjacentFields(place.position)
				.filter { it.field.player == place.field.player }
				.map { defenseOf(it.field) }
		for (def in defenses)
			if (def > defense)
				defense = def
		return defense
	}

	fun isConnected(origin: Position, destination: Position): Boolean {
		val area = connectedPositions(origin)
		for (pos in destination.adjacentHexes())
			if (area.any { it.position == pos })
				return true
		return false
	}

	fun connectedPositions(origin: Position): List<PositionedField<AlysField>> {
		val base = board[origin] ?: return listOf()
		val front = mutableListOf(origin)
		val connected = mutableListOf(origin)
		while (front.isNotEmpty()) {
			val nextPosition = front.removeAt(0)
			val newConnected = nextPosition.adjacentHexes()
					.filter { board.isWithinBounds(it) && board[it]?.player == base.player }
					.filter { !connected.contains(it) }
			connected.addAll(newConnected)
			front.addAll(newConnected)
		}
		return connected.map { PositionedField(it, board[it] as AlysField) }
	}

	fun neighbouringPositions(area: List<PositionedField<AlysField>>): List<PositionedField<AlysField>> {
		val neighbours = mutableListOf<PositionedField<AlysField>>()
		for (place in area)
			neighbours.addAll(
					adjacentFields(place.position)
							.filter { field -> neighbours.all { it.position != field.position } }
							.filter { field -> area.all { it.position != field.position } })
		return neighbours
	}

	fun adjacentFields(position: Position): List<PositionedField<AlysField>> {
		return position.adjacentHexes()
				.filter { board.isWithinBounds(it) && board[it] != null }
				.map { PositionedField(it, board[it] as AlysField) }
	}

	fun incomeFor(basePosition: Position): Int {
		return connectedPositions(basePosition).filter { it.field.piece?.type != AlysType.Tree && it.field.piece?.type != AlysType.CoastTree }.size
	}
}



