import React, { useState, useEffect } from 'react';
import { animated, useTrail, useSpring, useChain, useSpringRef } from 'react-spring';

const items = [0.5, 0.3, 0.2, 0.7, 1];

const Chain = () => {
  const [on, toggle] = useState(false);
  // store refs in component
  const springRef = useSpringRef();
  // this animation doesn't seem to fire...
  const { size } = useSpring({
    ref: springRef,
    from: { size: on ? "20%" : '100%' },
    to: { size: on ? '100%' : "20%" },
  });
  //
  const transitionRef = useSpringRef();
  const trail = useTrail(items.length, {
    ref: transitionRef,
    from: { opacity: 0, transform: 'scale(0)' },
    to: { opacity: on ? 1 : 0, transform: on ? 'scale(1)' : 'scale(0)' }
  });
  // useEffect(() => {
  //   transitionRef.start();
  // }, [on])
  //
  useChain(on ? [springRef, transitionRef] : [transitionRef, springRef],
    // known bug/behaviour with v9. both animations happen together
    // timers in seconds
    // disadvantages, loses spring like UX. IE user cannot cancel animation until second trigger.
    [0, 0.25]);
  //
  return (
    <div className={'full-width-height'}>
      <span>ChainBox: doesn't work properly in v9. known issue. Animations two should wait for animation one two finish</span>
      <animated.div style={{ width: size, height: size }} onClick={() => toggle(!on)} className="boxes-grid-two">
        {trail.map((animation, idx) => <animated.div key={idx} className="box-two" style={animation} />)}
      </animated.div>
    </div>
  );
};

export default Chain;
