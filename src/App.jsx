import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Card from './components/card/card'
import './styles/main.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Card />
    </>
  )
}

export default App
