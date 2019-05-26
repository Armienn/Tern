import org.w3c.dom.*
import kotlin.browser.document

fun main() {
	val header = document.getElementById("header") as HTMLElement
	val navigation = document.getElementById("navigation") as HTMLElement
	val playerArea = document.getElementById("player-area") as HTMLElement
	val gameAreaTop = document.getElementById("game-area-top") as HTMLElement
	val gameAreaRight = document.getElementById("game-area-right") as HTMLElement
	val canvasContainer = document.getElementById("canvas") as HTMLElement

	header.textContent = "Select a game"

	addButton(AlysDisplay(canvasContainer, playerArea, gameAreaTop, gameAreaRight), "Alys", navigation, header)
	addButton(CustomDisplay(canvasContainer, playerArea, gameAreaTop, gameAreaRight), "Eldrem", navigation, header)
	addButton(ChessDisplay(canvasContainer, playerArea, gameAreaTop, gameAreaRight), "Chess", navigation, header)
	addButton(VirusDisplay(canvasContainer, playerArea, gameAreaTop, gameAreaRight), "Virus", navigation, header)
	addButton(TicTacToeDisplay(canvasContainer, playerArea, gameAreaTop, gameAreaRight), "Tic Tac Toe", navigation, header)
}

private fun addButton(
		gameDisplay: GameDisplay<*, *, *, *, *>,
		name: String,
		navElement: HTMLElement,
		header: HTMLElement
) {
	val button = document.createElement("button") as HTMLButtonElement
	button.textContent = name
	navElement.appendChild(button)
	button.addEventListener("click", {
		header.textContent = name
		gameDisplay.showGame()
	})
}