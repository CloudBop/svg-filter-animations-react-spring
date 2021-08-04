import React, { useState, useEffect } from 'react'
import { useTransition, config, animated } from 'react-spring'
const NUM_TRANS = [
  {
    "fig": 1,
    "op": { "range": [0.75, 1], "output": [0, 1] },
    "trans": { "range": [0.75, 1], "output": [-40, 0], "extrapolate": "clamp" }
  },
  {
    "fig": 2,
    "op": { "range": [0.25, 0.5], "output": [0, 1] },
    "trans": { "range": [0.25, 0.5], "output": [-40, 0], "extrapolate": "clamp" }
  },
  {
    "fig": 3,
    "op": { "range": [0, 0.25], "output": [0, 1] },
    "trans": { "range": [0, 0.25], "output": [-40, 0], "extrapolate": "clamp" }
  },
  {
    "fig": 4,
    "op": { "range": [0.5, 0.75], "output": [0, 1] },
    "trans": { "range": [0.5, 0.75], "output": [-40, 0], "extrapolate": "clamp" }
  }
]

function TransitionArray() {
  const [items, setItems] = useState(NUM_TRANS)

  const transitions = useTransition(items, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
    config: config.molasses,
    onRest: () => setItems([]),
    // doesnt work
    // sort: (a, b) => a.fig > b.fig,
    // keys: item => item
  })

  useEffect(() => {
    if (items.length === 0) {
      setTimeout(() => {
        setItems(NUM_TRANS)
      }, 2000)
    }
  }, [items])

  return (
    <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "200px", width: "100%" }}>
      {/* (style, item, transitionObject, sibling position as an (int)) */}
      {transitions(({ opacity }, item, t, i) => (
        <animated.div
          style={{
            opacity: opacity.to(item.op),
            transform: opacity
              .to(item.trans)
              .to(y => `translate3d(0,${y}px,0)`),
          }}>
          {item.fig}

        </animated.div>
      ))}
    </div>
  )
}

export default TransitionArray

/**
The transition function accepts a callback that receives four arguments: the animated values, the item, the Transition object, and the sibling position.
It returns a React fragment containing every element returned by your callback. As you might assume, elements in the middle of their leave animation need to remain mounted.
All elements in the fragment are guaranteed to have a key prop, whether or not you define one explicitly. Unkeyed elements will use the ctrl.id from their Transition object.
For every unique item key, there exists a Transition object. The only time you have access to a Transition object is when it's passed as the 3rd argument of your transition callback.
 */