/////////////////////////////////////////////////variables///////////////////////////////////////////////
let square0 = document.getElementById("0")
let square1 = document.getElementById("1")
let square2 = document.getElementById("2")
let square3 = document.getElementById("3")
let square4 = document.getElementById("4")
let square5 = document.getElementById("5")
let square6 = document.getElementById("6")
let square7 = document.getElementById("7")
let square8 = document.getElementById("8")
let startButton = document.getElementById('start')
let banner = document.getElementById('turn-prompt')
let counter = document.getElementById("counter")
let minutes = document.getElementById("min")
let seconds = document.getElementById("sec")
seconds.textContent = '00'
minutes.textContent = '00'
let radioAI = document.getElementById("PvAI")
let radioPvP = document.getElementById("PvP")
let radios = document.getElementsByClassName('radio')
let gameAI
let squareArr = [square0, square1, square2, square3, square4, square5, square6, square7, square8]
let winArrays = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
const board = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let player1 = {
    symbol: 'X',
    name: '',
    moves: []
}
let player2 = {
    symbol: 'O',
    name: '',
    moves: []
}
let currentPlayer = player1
////////////////////////////////////////functions////////////////////////////////////
function changePlayer() {
    if (currentPlayer === player1) {
        currentPlayer = player2
    } else currentPlayer = player1
}
//compares 2 arrays; used in checkWin
function compareArray(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++) {
        if (!arr1.includes(arr2[i])) {
            return false
        }
    }
    return true
}
//compares player array to set of win arrays
function checkWin(array, nestArr) {
    for (win of nestArr) {
        if (compareArray(array, win)) {
            return true
        }
    } return false
}
// returns previously discovered win array (for highlighting)
function defineWin(array, nestArr) {
    for (win of nestArr) {
        if (compareArray(array, win)) {
            return win
        }
    } return false
}
// highlights win array 
function drawLine(arr) {
    for (square of arr) {
        squareArr[square].style.color = 'red'
    }
}
//creates a instance of possible moves based on both player's moves
function buildBoard(p1Arr, p2Arr) {
    let arr = []
    for (let move of board) {
        if (!p1Arr.includes(move) && !p2Arr.includes(move)) {
            arr.push(move)
        }
    }
    return arr
}
//begins counter interval
function startCounter() {
    counting = setInterval(() => {
        //increments every given time (in milliseconds)
        seconds.textContent = +seconds.textContent + 1
        if (+seconds.textContent < 10 && +seconds.textContent > 0) {
            seconds.textContent = '0' + seconds.textContent
        }
        if (+seconds.textContent > 59) {
            minutes.textContent = +minutes.textContent + Math.floor(+seconds.textContent / 60)
            if (60 % +seconds.textContent == 0) {
                seconds.textContent == '00'
            }
            if (+minutes.textContent < 10) {
                minutes.textContent = '0' + +minutes.textContent
            }
            seconds.textContent = +seconds.textContent - 60
            if (seconds.textContent == 0) {
                seconds.textContent = '00'
            }
        }
    }, 1000)

}
//ends counter
function stopCounter() {
    clearInterval(counting)
}
//resets board
function clearBoard() {
    seconds.textContent = '00'
    minutes.textContent = '00'
    currentPlayer = player1
    player1.moves = []
    player2.moves = []
    banner.textContent = ''
    squareArr.forEach(e => {
        e.removeEventListener('click', markSquare)
        e.clicked = false
        e.textContent = ''
        e.style.color = 'black'
    })
    startButton.disabled = false
    //unhides AI selector
    Array.from(radios).forEach(e => {
        e.hidden = false
    })
}

//////////////////////////////////////////////setup (event listeners)////////////////////////////
startButton.addEventListener('click', () => {
    //start button hides radio slector
    if (radioAI.checked === true) {
        gameAI = true
    } else gameAI = false
    //asks for player names
    let name1 = prompt("What's your name, player 1?")
    let name2 = prompt("What's your name, player 2?")
    //hides radio selectors
    Array.from(radios).forEach(e => {
        e.hidden = true
    })
    //asigns default names if null or empty
    if (name1 == '' || name1 == null) {
        player1.name = 'X'
    } else { player1.name = name1 }
    if (name2 == '' || name2 == null) {
        player2.name = 'O'
    } else { player2.name = name2 }
    startButton.disabled = true
    //start counter//
    startCounter()
    //adds event listener with markSquare function to each square
    banner.textContent = `${currentPlayer.name}'s Turn`
    squareArr.forEach(element => {
        element.addEventListener('click', markSquare)
        event.stopPropagation()
    })
}
)
////////////////////////////////////////////////////////////////////game logic/////////////////////
function markSquare(event) {
    if (event.target.clicked === true) {
        banner.textContent = 'Please select an empty cell'
        setTimeout(() => {
            banner.textContent = `${currentPlayer.name}'s Turn`
        }, 1000)
    }
    else if (gameAI === false) {
        event.target.textContent = currentPlayer.symbol
        banner.textContent = `${currentPlayer.name}'s Turn`
        currentPlayer.moves.push(+event.target.id)
        event.target.clicked = true
        ///////checks if win, and if not win, checks if draw
        if (checkWin(currentPlayer.moves, winArrays)) {
            winBoxes = defineWin(currentPlayer.moves, winArrays)
            drawLine(winBoxes)
            banner.textContent = `${currentPlayer.name} WINS!!!`
            stopCounter()
            return setTimeout(clearBoard, 2000)
        }
        if (player1.moves.length + player2.moves.length === 9) {
            banner.textContent = `DRAW!!!`
            stopCounter()
            return setTimeout(clearBoard, 2000)
        }
        changePlayer()
    }
    else if (gameAI === true) {
        if (currentPlayer === player1) {
            event.target.textContent = currentPlayer.symbol
            banner.textContent = `${currentPlayer.name}'s Turn`
            player1.moves.push(+event.target.id)
            event.target.clicked = true
            changePlayer()
            //////checks if win, and if not win, checks if draw
            if (checkWin(player1.moves, winArrays)) {
                winBoxes = defineWin(player1.moves, winArrays)
                drawLine(winBoxes)
                banner.textContent = (`${player1.name} wins!`)
                stopCounter()
                return setTimeout(clearBoard, 2000)
            }
            if (player1.moves.length + player2.moves.length === 9) {
                banner.textContent = 'Draw!!!'
                stopCounter()
                return setTimeout(clearBoard, 2000)
            }
        }
        if (currentPlayer === player2) {
            let boardInstance = buildBoard(player1.moves, player2.moves)
            let min = 0
            let max = boardInstance.length - 1
            let choice = Math.round(Math.random() * (max - min) + min)
            let chosen = squareArr[boardInstance[choice]]
            chosen.textContent = currentPlayer.symbol
            chosen.clicked = true
            player2.moves.push(+chosen.id)
            if (checkWin(player2.moves, winArrays)) {
                winBoxes = defineWin(currentPlayer.moves, winArrays)
                drawLine(winBoxes)
                banner.textContent = `${currentPlayer.name} WINS!!!`
                stopCounter()
                return setTimeout(clearBoard, 2000)
            }
            if (player1.moves.length + player2.moves.length === 9) {
                banner.textContent = `DRAW!!!`
                stopCounter()
                return setTimeout(clearBoard, 2000)
            }
            changePlayer()
        }
    }
}
