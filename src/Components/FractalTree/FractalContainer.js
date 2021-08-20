import React, { useState, useEffect } from 'react'
import FractalTreeFrame from './FractalTreeFrame'

// The height and width of the entire window
export const { innerHeight, innerWidth } = window

export default function FractalContainer() {
  const [time, setTime] = useState(Date.now())
  const [mousePosition, setMousePosition] = useState({
    x: innerWidth / 2,
    y: innerHeight / 2,
  })

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setTime(Date.now())
    })
    // ran if rerendered and if unmounted. STOP this effect
    return () => {
      // this fix also accounts for mounting and unmounting components 
      window.cancelAnimationFrame(frame)
    }
  })

  return (
    <FractalTreeFrame
      mousePosition={mousePosition}
      onMouseMove={({ clientX: x, clientY: y }) =>
        // this will trigger rerender, causing two raf slowing everything +framerate
        // useEffect fixes this
        setMousePosition({ x, y })
      }
      time={time}
    />
  )
}