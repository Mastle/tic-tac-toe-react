/* 
TODO:
 2 - Current step: Rewrite Board to use two loops to make the squares instead of hardcoding them.
 3 - Add a toggle button that lets you sort the moves in either ascending or descending order.
 4 - When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
 5 - Display the location for each move in the format (row, col) in the move history list.
Next:
 - Reviewing the must know things about react by watching (maybe even pracitcing) Brad's latest tutorial on React. 
 - Consider how you are going to create the piano emulator that is supposed to be the bedrock of Harmony Hub and your magnum opus for becoming a solid software engineering team. 
 A little research will probably be needed. What other prerequisites are neeeded (prolly next.js) ? once you've figured out those by fully conceiving the project you want to create as much as you can, you're ready to move on.

*/
import { useState } from 'react'
import './styles.css'

function Square({ value, onSquareClick }) {


  return <button className="square" onClick={onSquareClick}> {value}</button>
}




function Board({ xIsNext, squares, onPlay }) {

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
    status = "Winner: " + winner
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O")
  }

  const renderSquares = () => {
    const board = []
    let squareIndex = 0

    for (let i = 0; i < 3; i++) {
      const row = []


      for (let j = 0; j < 3; j++) {

        row.push(
          <Square
            key={squareIndex}
            value={squares[squareIndex]}
            onSquareClick={() => handleClick(squareIndex)} //current step: I found the problems, by the time "handleClick fires off, squareIndex has been set to 9, how can I solve this problem?"
          />
        )
        squareIndex++
        console.log(squareIndex)
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

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]

    }

  }
  return null

}

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      if (move === currentMove) {
        description = ' You are currently at move #' + move
        return (
          <li key={move}>
            <h1>{description}</h1>
          </li>
        )

      } else
        description = ' Go to move #' + move
    } else {
      description = 'Go to the game start'
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )

  })


  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul>{moves}</ul>
      </div>
    </div>
  )
}

export default Game