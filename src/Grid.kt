import kotlin.math.abs
import kotlin.math.max

class Grid<F>(
		val width: Int,
		val height: Int,
		val init: (x: Int, y: Int) -> F,
		val fields: MutableList<F> = MutableList(width * height) { index -> init(index % width, index / width) }
) {

	operator fun get(x: Int, y: Int) = fields[x + width * y]
	operator fun get(position: Position) = fields[position.x + width * position.y]
	operator fun set(x: Int, y: Int, value: F) {
		fields[x + width * y] = value
	}

	operator fun set(position: Position, value: F) {
		fields[position.x + width * position.y] = value
	}

	fun copy(
			width: Int = this.width,
			height: Int = this.height,
			init: (x: Int, y: Int) -> F = this.init,
			fields: MutableList<F> = this.fields.toMutableList()
	): Grid<F> {
		return Grid(width, height, init, fields)
	}

	fun isWithinBounds(position: Position): Boolean {
		return position.x in 0 until width && position.y in 0 until height
	}

	fun positions(): List<Position> {
		return List(fields.size) { index -> Position(index % width, index / width) }
	}

	fun positionedFields(): List<PositionedField<F>> {
		return List(fields.size) { index -> PositionedField(Position(index % width, index / width), fields[index]) }
	}
}

data class PositionedField<F>(val position: Position, val field: F)