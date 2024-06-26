/* 
TODO:
  5 - Display the location for each move in the format (row, col) in the move history list.
  6 -  TL;DR: gotta study the fuck outta this shit )This tic tac toe game seems like an amazing opportunity for leaning react and javascript deeply. It feels like a project that has all the features that allow you to understand how react actually works. Once you've figured out those subtlty , you'll be confident enough to consider yourself a beginner react developer

 Next:
 - Reviewing the must know things about react by watching (maybe even pracitcing) Brad's latest tutorial on React. 
 - Consider how you are going to create the piano emulator that is supposed to be the bedrock of Harmony Hub and your magnum opus for becoming a solid software engineering team. 
 A little research will probably be needed. What other prerequisites are neeeded (prolly next.js) ? once you've figured out those by fully conceiving the project you want to create as much as you can, you're ready to move on.

*/
import { useState } from 'react'
import './styles.css'

function Square({ value, onSquareClick, winningSquare = { color: null } }) {


    return <button className="square" onClick={onSquareClick} style={winningSquare}>{value}</button>
}




function Board({ xIsNext, squares, onPlay }) {
    let winningIndexes = []

    const handleClick = (i) => {
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        const nextSquares = squares.slice()

        if (xIsNext) {
            nextSquares[i] = "X"

        }
        else {
            nextSquares[i] = "O"

        }

        onPlay(nextSquares)

    }

    const winner = calculateWinner(squares)

    let status
    if (winner) {
        winningIndexes = winner
        status = "Winner: " + winner[3]
    } else {
        status = "Next Player: " + (xIsNext ? "X" : "O")
    }

    const renderSquares = () => {
        const board = []

        for (let i = 0; i < 3; i++) {
            const row = []


            for (let j = 0; j < 3; j++) {
                const squareIndex = i * 3 + j
                let isWinningSquare = false




                if (winningIndexes.length > 0) {
                    for (let k = 0; k < 3; k++) {
                        if (winningIndexes[k] === squareIndex) {
                            isWinningSquare = true
                            break
                        }
                    }
                }

                row.push(
                    <Square
                        key={squareIndex}
                        value={squares[squareIndex]}
                        onSquareClick={() => handleClick(squareIndex)}
                        winningSquare={isWinningSquare ? { color: "purple" } : {}}
                    />
                )
            }
            board.push(<div key={i} className="board-row">{row}</div>)
        }

        return board

    }



    return (
        <>
            <div className="container">
                <div className="game-state-announcer">
                    {status}
                </div>
                {renderSquares()}
            </div>
        </>
    )
}


const calculateWinner = (squares) => {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        const winnerIndexes = [a, b, c]

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            const winnerIndexesSquare = [...winnerIndexes, squares[a]]
            return winnerIndexesSquare

        }

    }
    return null

}

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const [moves, setMoves] = useState([])
    const [isAscending, setIsAscending] = useState(true)
    const xIsNext = currentMove % 2 === 0
    const currentSquares = history[currentMove]


    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
        setMoves(newMoves)
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove)
    }

    const newMoves = history.map((squares, move) => {
        let description
        if (move > 0) {
            if (move === currentMove) {
                description = `You are currently at move # ${move + 1}`
                return (
                    <li key={move}>
                        <h1>{description}</h1>
                    </li>
                )

            } else
                description = `Go to move #${move + 1}`
        } else {
            description = 'Go to the game start'
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )

    })

    const orderAsc = () => {
        setMoves([...moves].reverse())
        setIsAscending(!isAscending)

    }





    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ul>{moves}</ul>
                {isAscending ? <button onClick={() => orderAsc()}> sort by descending order</button> : <button onClick={() => orderAsc()}>sort by ascending order</button>}
            </div>
        </div>
    )
}

export default Game