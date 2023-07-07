const cells = document.querySelectorAll(".cell")
const statusTextEl = document.querySelector("#statusText")
const restartBtn =document.querySelector("#restart")

const winConditions = [
     [0, 1, 2],
     [0, 3, 6],
     [2, 4, 7],
     [3, 5, 8],
     [3, 4, 5],
     [6, 7, 8],
     [0, 4, 8],
     [6, 4, 2]
]

let options = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = "X"
let running = false

startTheGame();

function startTheGame(){
    cells.forEach(cell => cell.addEventListener("click",cellClicked))
    restartBtn.addEventListener("click",restartGame)
    statusTextEl.textContent = `${currentPlayer}'s turn`
    running = true
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex")

    if (options[cellIndex] != "" || !running){
        return;
    }
    cellsUpdated(this,cellIndex)
    
    checkWinner()
}

function cellsUpdated(cell,index){
    options[index] = currentPlayer
    cell.textContent = currentPlayer

}

function changePlayer(){
     currentPlayer = (currentPlayer == "X") ? "O" : "X"
     statusTextEl.textContent = `${currentPlayer}'s turn`
}

function checkWinner(){
        let roundWon = false

        for (let i = 0;i < winConditions.length;i++){
            let condition = winConditions[i]
            let cellA = options[condition[0]]
            let cellB = options[condition[1]]
            let cellC = options[condition[2]]

            if (cellA == "" || cellB == "" || cellC == ""){
                continue;
            }
            if (cellA == cellB && cellB == cellC){
                 roundWon = true
                 break;
            }
        }
        if(roundWon){
            statusTextEl.textContent = `${currentPlayer}' win`
            running = false
        }
        else if(!options.includes("")){
            statusTextEl.textContent = "Draw"
        }
        else{
            changePlayer()
        }
}

function restartGame(){
        currentPlayer = "X"
        cells.forEach(cell => cell.textContent = "")
        options = ["", "", "", "", "", "", "", "", ""]
        statusTextEl.textContent = `${currentPlayer}'s turn`
        running = true
}