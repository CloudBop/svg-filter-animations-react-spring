import React, { useState, useEffect } from 'react'
import { useTransition, config, animated } from 'react-spring'
export default function Toggle() {
  const [toggle, set] = useState(false)
  const transitions = useTransition(toggle, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: toggle,
    // or animations merge together
    delay: 200,
    config: config.molasses,
    onRest: () => set(!toggle),
    //  You must use explicit keys for any item that is an immutable object.
    // Using explicit keys for mutable objects is unnecessary.🥳
    // If you're passing a single item to useTransition, you have the option of passing a single key as the key prop.
    // key: toggle.key,
  })
  return transitions(({ opacity }, item) =>
    item ? (
      <animated.div
        style={{
          position: 'absolute',
          opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
        }}>
        😄
      </animated.div>
    ) : (
      <animated.div
        style={{
          position: 'absolute',
          opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
        }}>
        🤪
      </animated.div>
    )
  )
}