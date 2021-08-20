import React, { useState } from 'react'
import FractalTreeFrame from './FractalTreeFrame'

// The height and width of the entire window
export const { innerHeight, innerWidth } = window

export default function FractalContainer() {
  const [time, setTime] = useState(Date.now())
  const [mousePosition, setMousePosition] = useState({
    x: innerWidth / 2,
    y: innerHeight / 2,
  })

  window.requestAnimationFrame(() => {
    // Update time to trigger a re-render
    setTime(Date.now())
  })

  return (
    <FractalTreeFrame
      mousePosition={mousePosition}
      onMouseMove={({ clientX: x, clientY: y }) =>
        setMousePosition({ x, y })
      }
      time={time}
    />
  )
}