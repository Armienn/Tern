import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.Path2D
import org.w3c.dom.events.Event
import org.w3c.dom.events.MouseEvent
import kotlin.math.sqrt

class SquareGridDisplay(val canvas: HTMLCanvasElement) {
	val context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D
	private var hexagonal = false
	var fieldSize = 40.0
	var gridThickness = 1.0
	var hexPath = Path2D()
	var hexPathOffset = Path2D()
	var hexDeltaX = 0.0
	var hexDeltaY = 0.0
	var onClick: ((Position) -> Unit)? = null

	fun <T> display(grid: SquareGrid<T>,
									fillStyle: ((T, x: Int, y: Int) -> String)? = null,
									draw: ((context: CanvasRenderingContext2D, fieldSize: Double, field: T, x: Int, y: Int) -> Unit)? = null) {
		val deltaX = if(hexagonal) hexDeltaX else fieldSize + gridThickness
		val deltaY = if(hexagonal) hexDeltaY else fieldSize + gridThickness
		val offset = if(hexagonal) (gridThickness + fieldSize)/2 else 0.0
		val extraY = if(hexagonal) fieldSize / (2 * sqrt(3.0)) else 0.0
		context.fillStyle = "black"
		if (gridThickness > 0)
			context.fillRect(0.0, 0.0,
					grid.height * deltaX + gridThickness + offset,
					grid.width * deltaY + gridThickness + extraY)
		for (y in 0 until grid.height) {
			for (x in 0 until grid.width) {
				context.fillStyle = fillStyle?.invoke(grid[x, y], x, y) ?: "white"
				if (hexagonal)
					drawHexagon(x, y)
				else
					drawSquare(x, y)
				if (draw != null) {
					context.save()
						context.translate(x * deltaX + if(y%2 == 0) offset else 0.0, y * deltaY)
					draw(context, fieldSize, grid[x, y], x, y)
					context.restore()
				}
			}
		}
	}

	private fun drawSquare(x: Int, y: Int) {
		context.fillRect(
				gridThickness + x.toDouble() * (fieldSize + gridThickness),
				gridThickness + y.toDouble() * (fieldSize + gridThickness),
				fieldSize, fieldSize)
	}

	private fun drawHexagon(x: Int, y: Int) {
		context.save()
		context.translate(x * hexDeltaX, y * hexDeltaY)
		context.fill(if (y % 2 == 0) hexPath else hexPathOffset)
		context.restore()
	}

	fun showHexagons() {
		hexagonal = true
		hexDeltaX = fieldSize + gridThickness
		hexDeltaY = 3 * (fieldSize / (2 * sqrt(3.0))) + gridThickness / sqrt(3.0)
		hexPath = createHexagonPath(false)
		hexPathOffset = createHexagonPath(true)
	}

	private fun createHexagonPath(offset: Boolean): Path2D {
		val halfWidth = fieldSize / 2
		val fourthHeight = fieldSize / (2 * sqrt(3.0))
		val offsetWidth = if (offset) 0.0 else (halfWidth + gridThickness / 2)
		val path = Path2D()
		path.moveTo(0.0 + offsetWidth, fourthHeight)
		path.lineTo(halfWidth + offsetWidth, 0.0)
		path.lineTo(halfWidth * 2 + offsetWidth, fourthHeight)
		path.lineTo(halfWidth * 2 + offsetWidth, fourthHeight * 3)
		path.lineTo(halfWidth + offsetWidth, fourthHeight * 4)
		path.lineTo(0.0 + offsetWidth, fourthHeight * 3)
		path.closePath()
		return path
	}

	val clickListener = { event: Event ->
		event as MouseEvent
		val gridPosition = gridCoordsAt(event.offsetX.toInt(), event.offsetY.toInt())
		if (gridPosition != null)
			onClick?.invoke(gridPosition)
	}

	init {
		canvas.addEventListener("click", clickListener)
	}

	fun end() {
		canvas.removeEventListener("click", clickListener)
		val context = canvas.getContext("2d") as CanvasRenderingContext2D
		context.clearRect(0.0, 0.0, canvas.width.toDouble(), canvas.height.toDouble())
	}

	fun gridCoordsAt(canvasX: Int, canvasY: Int): Position? {
		val localX = canvasX % (fieldSize + gridThickness)
		val localY = canvasY % (fieldSize + gridThickness)
		if (localX < gridThickness || localY < gridThickness)
			return null
		val gridX = (canvasX / (fieldSize + gridThickness)).toInt()
		val gridY = (canvasY / (fieldSize + gridThickness)).toInt()
		return Position(gridX, gridY)
	}
}

