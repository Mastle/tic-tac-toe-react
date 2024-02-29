import { useState } from 'react'
import './styles.css'

function Square() {
  const [value, setValue] = useState()

  const handleClick = () => {
    setValue("x")
  }

  return <button className="square" onClick={handleClick}>{value}</button>
}





export default function Board() {


  return (
    <>
      <div className="container">
        <div className="board-row">
          <Square />
          <Square />
          <Square />
        </div>
        <div className="board-row">
          <Square />
          <Square />
          <Square />
        </div>
        <div className="board-row">
          <Square />
          <Square />
          <Square />
        </div>
      </div>
    </>
  )
}

