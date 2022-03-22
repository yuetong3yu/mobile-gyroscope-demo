import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [userAgent, setUserAgent] = useState('')

  useEffect(() => {
    setUserAgent(navigator.userAgent)
  }, [])

  return (
    <div className="App">
      <h1>Your Device: </h1>
      <h3>{userAgent}</h3>
    </div>
  )
}

export default App
