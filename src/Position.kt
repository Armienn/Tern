import kotlin.math.abs
import kotlin.math.max

data class Position(val x: Int, val y: Int) {
	fun add(i: Int, j: Int): Position {
		return Position(x + i, y + j)
	}

	fun adjacentHexes(): List<Position> {
		return listOf(hexNW(), hexNE(), hexW(), hexE(), hexSW(), hexSE())
	}

	fun hexNW(distance: Int = 1) = Position(x - distance/2 + if((y+distance)%2==0) -1 else 0, y - distance)
	fun hexNE(distance: Int = 1) = Position(x + distance/2 + if((y+distance)%2==0) 0 else 1, y - distance)
	fun hexW(distance: Int = 1) = Position(x - distance, y)
	fun hexE(distance: Int = 1) = Position(x + distance, y)
	fun hexSW(distance: Int = 1) = Position(x - distance/2 + if((y+distance)%2==0) -1 else 0, y + distance)
	fun hexSE(distance: Int = 1) = Position(x + distance/2 + if((y+distance)%2==0) 0 else 1, y + distance)

	fun manhattanDistance(destination: Position) =
			abs(x - destination.x) + abs(y - destination.y)

	fun chebychevDistance(destination: Position) =
			max(abs(x - destination.x), abs(y - destination.y))

	fun hexDistance(destination: Position): Int {
		val a = this.transformHexCoords()
		val b = destination.transformHexCoords()
		val deltaX = a.x - b.x
		val deltaY = a.y - b.y
		if(deltaX * deltaY < 0)
			return a.chebychevDistance(b)
		return a.manhattanDistance(b)
	}

	fun transformHexCoords() = copy(x = x - ((y + 1) / 2))
}
