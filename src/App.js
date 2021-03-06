import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [userAgent, setUserAgent] = useState('')

  const [deviceOrientation, setDeviceOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  })
  const [deviceAccelerometer, setDeviceAccelerometer] = useState({
    x: 0,
    y: 0,
    z: 0,
  })

  const handleDeviceAccelerometer = useRef(() => {})
  const handleDeviceOrientation = useRef(() => {})

  useEffect(() => {
    setUserAgent(navigator.userAgent)
    handleDeviceAccelerometer.current = (event) => {
      setDeviceAccelerometer({
        x: Number(event.acceleration.x).toFixed(2),
        y: Number(event.acceleration.y).toFixed(2),
        z: Number(event.acceleration.z).toFixed(2),
      })
    }
    handleDeviceOrientation.current = (event) => {
      setDeviceOrientation({
        alpha: Number(event.alpha).toFixed(2),
        beta: Number(event.beta).toFixed(2),
        gamma: Number(event.gamma).toFixed(2),
      })
    }
  }, [])

  const handleAddGyroscopeClick = () => {
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
              handleDeviceOrientation.current
            )
          }
        })
        .catch(console.error)
    }
  }

  const handleRemoveGyroscopeClick = () => {
    window.removeEventListener(
      'deviceorientation',
      handleDeviceOrientation.current
    )
  }

  const handleAddAcceleroClick = () => {
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      DeviceMotionEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            window.addEventListener(
              'devicemotion',
              handleDeviceAccelerometer.current
            )
          }
        })
        .catch(console.error)
    }
  }

  const handleRemoveAcceleroClick = () => {
    window.removeEventListener(
      'devicemotion',
      handleDeviceAccelerometer.current
    )
  }

  return (
    <div className="App">
      <button onClick={handleAddGyroscopeClick}>add gyroscope listener</button>
      <button onClick={handleRemoveGyroscopeClick}>
        remove gyroscope listener
      </button>
      <button onClick={handleAddAcceleroClick}>
        add accelerometer listener
      </button>
      <button onClick={handleRemoveAcceleroClick}>
        remove accelerometer listener
      </button>
      <h1>??????: </h1>
      <h3>{userAgent}</h3>
      <br />
      <h2>?????????</h2>
      <h3>????????????: {deviceOrientation.alpha}</h3>
      <h3>????????????: {deviceOrientation.beta}</h3>
      <h3>????????????: {deviceOrientation.gamma}</h3>
      <br />
      <h2>?????????</h2>
      <h3>X?????????: {deviceAccelerometer.x}</h3>
      <h3>Y?????????: {deviceAccelerometer.y}</h3>
      <h3>Z?????????: {deviceAccelerometer.z}</h3>
    </div>
  )
}

export default App
