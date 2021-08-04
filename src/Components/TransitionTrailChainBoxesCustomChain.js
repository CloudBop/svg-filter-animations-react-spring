import React, { useState, useEffect } from 'react';
import { animated, useTrail, useSpring, useSpringRef, useChain, useTransition } from 'react-spring';
// mimic array of component, using item[idx] as key
const items = [0.5, 0.3, 0.2, 0.7, 1, 9, 89, 56, 90, 543];

const Chain = () => {
  const [on, toggle] = useState(false);
  // console.log(`on`, on)
  // store refs in component
  const springRef = useSpringRef();
  const { x } = useSpring({
    ref: springRef,
    // to: { size: on ? '100%' : '20%' },
    x: on ? "100%" : "20%",
    // from: { size: on ? '100%' : '20%' }
    // config: {
    //   duration: 2000
    // }
  });
  //
  //
  const transitionRef = useSpringRef();
  const transition = useTransition(on ? items : [], {
    trail: 1000 / items.length,
    ref: transitionRef,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
    // expires: 2000
  });

  //
  useChain(on ? [springRef, transitionRef] : [transitionRef, springRef],
    //  time in seconds to wait before firing animation
    [0, 1]);
  // 

  // useChain mimicry
  // useEffect(() => {
  //   // (async () => {
  //   if (on) {
  //     let [promise] = springRef.start()
  //     promise.then(() => {

  //       transitionRef.start()
  //       // setTimeout(()=>, 0)
  //     })
  //   } else {
  //     (function () {
  //       let p = transitionRef.start()
  //       // console.log(promises)
  //       let finalitem = p.length - 1
  //       // prom && prom.
  //       p?.[finalitem]?.then(() => springRef.start())
  //     }())
  //   }
  // }, [on, springRef, transitionRef])

  return (
    <div className={'full-height'}>
      <animated.div
        // className="box-group-container"
        style={{ width: x, height: x }} onClick={() => toggle(!on)} className="boxes-grid-two">
        {/* <animated.div className="box-group-container" style={{ transform: x.interpolate(x => `translate3d(${x * 1}%, ${x * 1}% , 0)`) }} onClick={() => toggle(!on)} className="boxes-grid-two"> */}
        {transition((aniProps, key, item) => (
          <animated.div key={key} className="box-two" style={aniProps} />
        ))}
      </animated.div>
    </div >
  );
};

export default Chain;
