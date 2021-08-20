import React, { useState } from 'react'
import FractalTreeFrame from './FractalTreeFrame'

// The height and width of the entire window
export const { innerHeight, innerWidth } = window

export default function FractalContainer() {
  const [mousePosition, setMousePosition] = useState({
    x: innerWidth / 2,
    y: innerHeight / 2,
  })

  return (
    <FractalTreeFrame
      mousePosition={mousePosition}
      onMouseMove={({ clientX: x, clientY: y }) =>
        setMousePosition({ x, y })
      }
      time={Date.now()}
    />
  )
}