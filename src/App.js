import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [userAgent, setUserAgent] = useState('')

  const [deviceOrientation, setDeviceOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  })

  const [response, setResponse] = useState('')

  useEffect(() => {
    setUserAgent(navigator.userAgent)
  }, [])

  const handleClick = () => {
    // ios 13+ device need permission to use device orientation
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      DeviceMotionEvent.requestPermission().then((res) => {
        console.error('permission', res)
      })
    }
  }

  return (
    <div className="App">
      <button onClick={handleClick}>ask permission</button>
      <h1
        onClick={() => {
          console.log('123 hi')
        }}
      >
        Your Device:{' '}
      </h1>
      <h3>{userAgent}</h3>
      <br />
      <h3>alpha: {deviceOrientation.alpha}</h3>
      <h3>beta: {deviceOrientation.beta}</h3>
      <h3>gamma: {deviceOrientation.gamma}</h3>
      <h3 style={{ color: 'red' }}>res: {response}</h3>
    </div>
  )
}

export default App
