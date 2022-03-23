import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [userAgent, setUserAgent] = useState('')

  const [deviceOrientation, setDeviceOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  })

  useEffect(() => {
    setUserAgent(navigator.userAgent)
  }, [])

  const handleDeviceOrientation = (event) => {
    setDeviceOrientation({
      alpha: Number(event.alpha).toFixed(2),
      beta: Number(event.beta).toFixed(2),
      gamma: Number(event.gamma).toFixed(2),
    })
  }

  const handleAddClick = () => {
    // ios 13+ device need permission to use device orientation
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      DeviceMotionEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            window.addEventListener(
              'deviceorientation',
              handleDeviceOrientation
            )
          }
        })
        .catch(console.error)
    }
  }

  const handleRemoveClick = () => {
    window.removeEventListener('deviceorientation', handleDeviceOrientation)
  }

  return (
    <div className="App">
      <button onClick={handleAddClick}>add listener</button>
      <button onClick={handleRemoveClick}>remove listener</button>
      <h1>Your Device: </h1>
      <h3>{userAgent}</h3>
      <br />
      <h3>水平旋转: {deviceOrientation.alpha}</h3>
      <h3>竖直翻转: {deviceOrientation.beta}</h3>
      <h3>水平翻转: {deviceOrientation.gamma}</h3>
    </div>
  )
}

export default App
