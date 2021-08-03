import React, { useState, useRef } from 'react';
import { animated, useTrail, useSpring, useChain, useSpringRef } from 'react-spring';

const items = [0.5, 0.3, 0.2, 0.7, 1];

const Chain = () => {
  const [on, toggle] = useState(false);
  // store refs in component
  const springRef = useSpringRef();
  // this animation doesn't seem to fire...
  const { size } = useSpring({
    ref: springRef,
    to: { size: on ? '100px' : '20px' },
    from: { size: on ? '100px' : '20px' }
  });
  //
  //
  const transitionRef = useSpringRef();
  const trail = useTrail(items.length, {
    ref: transitionRef,
    from: { opacity: 0, transform: 'scale(0)' },
    to: { opacity: on ? 1 : 0, transform: on ? 'scale(1)' : 'scale(0)' }
  });

  //
  // useChain(on ? [transitionRef, springRef] : [springRef, transitionRef]);
  useChain(on ? [springRef, transitionRef] : [transitionRef, springRef]);
  //

  return (
    <div className={'full-width-height'}>
      <animated.div style={{ width: size, height: size }} onClick={() => toggle(!on)} className="boxes-grid-two">
        {trail.map((animation, idx) => <animated.div key={idx} className="box-two" style={animation} />)}
      </animated.div>
    </div>
  );
};

export default Chain;
