import { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GameBoard />
    </>
  )
}

export default App