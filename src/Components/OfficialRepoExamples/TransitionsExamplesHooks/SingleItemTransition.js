// doesn't work
// import React, { useState } from 'react'
// import { useTransition, config, animated } from 'react-spring'
// const NUM_TRANS = [
//   {
//     "fig": 1,
//     "op": { "range": [0.75, 1], "output": [0, 1] },
//     "trans": { "range": [0.75, 1], "output": [-40, 0], "extrapolate": "clamp" }
//   },
//   {
//     "fig": 2,
//     "op": { "range": [0.25, 0.5], "output": [0, 1] },
//     "trans": { "range": [0.25, 0.5], "output": [-40, 0], "extrapolate": "clamp" }
//   },
//   {
//     "fig": 3,
//     "op": { "range": [0, 0.25], "output": [0, 1] },
//     "trans": { "range": [0, 0.25], "output": [-40, 0], "extrapolate": "clamp" }
//   },
//   {
//     "fig": 4,
//     "op": { "range": [0.5, 0.75], "output": [0, 1] },
//     "trans": { "range": [0.5, 0.75], "output": [-40, 0], "extrapolate": "clamp" }
//   }
// ]

// function ItemsTransition() {
//   const [items, setItems] = useState([])


//   const transition = useTransition(items, {
//     enter: item => [
//       { opacity: item.opacity || 1, height: item.height || 50 },
//       { life: '100%' },
//     ],
//     leave: item => async (next, cancel) => {
//       // await next({ life: '0%' })
//       // await next({ opacity: 0 })
//       // await next({ height: 0 })
//     },
//     from: { life: '0%', opacity: 0, height: 0 },
//   })
//   return (
//     <div onClick={() => setItems(p => p.length === 0 ? [NUM_TRANS] : [])}>
//       {transition((styles, item) => (
//         <animated.div
//           style={styles}>
//           {item.fig}

//         </animated.div>
//       ))}
//     </div>
//   )
// }

// export default ItemsTransition
