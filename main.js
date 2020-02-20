/////////////////////////////////////////////////variables/////////////////////////
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
let currentPlayer = 'X'
let banner = document.getElementById('turn-prompt')
let squareArr = [square0, square1, square2, square3, square4, square5, square6, square7, square8]
let winArrays = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let player1 = {
    name: '',
    moves: []
}
let player2 = {
    name: '',
    moves: []
}////////////////////////////////////////functions////////////////////////////////////

function changePlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O'
    } else currentPlayer = 'X'
}
function checkWin(array, nestArr) {
    for (win of nestArr) {
        if (compareArray(array, win)) {
            return true
        }
    } return false
}
function compareArray(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++) {
        if (!arr1.includes(arr2[i])) {
            return false
        }
    }
    return true
}

function clearBoard() {
    player1.moves = []
    player2.moves = []
    banner.textContent = ''
    squareArr.forEach(e => {
        e.removeEventListener('click', markSquare)
        e.clicked = false
        e.textContent = ''
    })
    startButton.disabled = false
}
function markSquare(event) {
    event.target.textContent = currentPlayer
    if (currentPlayer === 'X') {
        player1.moves.push(+event.target.id)
        event.target.clicked = true
        if (checkWin(player1.moves, winArrays)) {
            alert('PLAYER X WINS!')
            return clearBoard()
        }
    }
    else if (currentPlayer === 'O') {
        player2.moves.push(+event.target.id)
        event.target.clicked = true
        if (checkWin(player2.moves, winArrays)) {
            alert('Player O WINS!')
            return clearBoard()
        }
    }
    if (player1.moves.length + player2.moves.length === 9) {
        alert('Draw!')
        return clearBoard()
    }
    changePlayer()
    banner.textContent = `${currentPlayer}'s Turn`
}
//////////////////////////////////////////////setup (event listeners)////////////////////////////

startButton.addEventListener('click', () => {
    console.log(player1.moves)
    startButton.disabled = true
    banner.textContent = `${currentPlayer}'s Turn`
    squareArr.forEach(element => {
        element.addEventListener('click', markSquare)
        event.stopPropagation()
    })
}
)

//let p1Arr = []
//let p2Arr = []
//let board = [0, 1, 2, 3, 4, 5, 6, 7, 8]
//
//function buildBoard(player1Arr, player2Arr) {
//    let arr = []
//    for (let move of board) {
//        if (!player1Arr.includes(move) && !player2Arr.includes(move)) {
//            arr.push(move)
//        }
//    }
//    return arr
//}
//
//
//



//function findMove(arr1, arr2) {
//    let scoreArr = []
//    let depth = 0
//    minMax(buildBoard(arr1, arr2), depth)
//
//    function minMax(potentialMoves, d) {
//        for (let move of potentialMoves) {
//            if (currentPlayer === 'X') {
//                p1Arr.push(move)
//                if (checkWin(p1Arr, winArrays)) {
//                    console.log('p1Arr: ' + p1Arr)
//                    scoreArr.push(10 - d)
//                    changePlayer()
//                    return
//                } else {
//                    changePlayer()
//                    d++
//                    minMax(buildBoard(p1Arr, p2Arr), d)
//                }
//            } else if (currentPlayer == 'O') {
//                p2Arr.push(move)
//                if (checkWin(p2Arr, winArrays)) {
//                    console.log('p2Arr: ' + p2Arr)
//                    scoreArr.push(-10 + d)
//                    changePlayer()
//                    return
//                } else {
//                    changePlayer()
//                    d++
//                    minMax(buildBoard(p1Arr, p2Arr), d)
//                }
//            }
//        }
//    }
//    console.log(scoreArr)
//    return scoreArr
//}
//findMove(p1Arr, p2Arr)
//