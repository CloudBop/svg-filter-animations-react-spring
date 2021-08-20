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
    window.requestAnimationFrame(() => {
      // this fix works, but errors could be thrown on unmount as setTime could be called on unmount.
      setTime(Date.now())
    })
  }, [time])

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