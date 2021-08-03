import React, { useState, useEffect } from 'react';
import { animated, useTrail, useSpring, useSpringRef, useChain, useTransition } from 'react-spring';
// mimic array of component, using item[idx] as key
const items = [0.5, 0.3, 0.2, 0.7, 1, 9, 89, 56, 90, 543];

const Chain = () => {
  const [on, toggle] = useState(false);
  // store refs in component
  const springRef = useSpringRef();
  const { x } = useSpring({
    ref: springRef,
    // to: { size: on ? '100%' : '20%' },
    x: on ? "100%" : "20%",
    // from: { size: on ? '100%' : '20%' }
    // config: {
    //   duration: 100
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
    leave: { opacity: 0, transform: 'scale(0)' }
  });

  //
  useChain(on ? [springRef, transitionRef] : [transitionRef, springRef], [0, 1]);
  // attempt at mimicking some kind of cb syntax
  // const myPromise = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     springRef.start()
  //     resolve()
  //   }, 0);
  // }).then(() => console.log(`object`) // transitionRef.start()
  // )
  // useEffect(() => {
  //   if (on) {
  //     myPromise.then(t => console.log(t))
  //     console.log(`OnfireMe`)
  //     // fireMe.then(() => {
  //     //   return transitionRef.start()
  //     // })

  //     // .then(() => transitionRef.start())
  //     // springRef.start()
  //   } else {
  //     // springRef.start()
  //     console.log(`!onfireMe`)
  //     myPromise.then(t => console.log(t))
  //   }
  // }, [on])

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
