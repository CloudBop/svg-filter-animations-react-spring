import React, { useState, useRef } from 'react';
import { animated, useSpring, useChain, useTransition, useSpringRef } from 'react-spring';

const items = [0.5, 0.3, 0.2, 0.7, 1];

const Chain = () => {
  const [on, toggle] = useState(false);
  // store refs in component
  const springRef = useSpringRef();
  const { size } = useSpring({
    ref: springRef,
    from: { size: on ? '20%' : '100%' },
    to: { size: on ? '100%' : '20%' },
    // from: { size: on ? '100%' : '20%' }
    // size: on ? '100%' : '20%'
    // size: on ? "100%" : "20%",
  });
  //
  //
  const transitionRef = useSpringRef();
  const transition = useTransition(on ? items : [],
    // item => item, -> this function argument no longer needed 
    {
      ref: transitionRef,
      from: { opacity: 0, transform: 'scale(0)' },
      enter: { opacity: 1, transform: 'scale(1)' },
      leave: { opacity: 0, transform: 'scale(0)' }
    });

  //
  // useChain(on ? [springRef, transitionRef] : [transitionRef, springRef]);
  // useChain([springRef, transitionRef]);
  useChain(on ? [springRef, transitionRef] : [transitionRef, springRef],
    // 
    [0, 0.75]);
  //

  return (
    <div className={'full-height'}>
      <animated.div style={{ width: size, height: size }} onClick={() => toggle(!on)} className="boxes-grid-two">
        {transition((aniProps, key, item) => (
          <animated.div key={key} className="box-two" style={aniProps} />
        ))}
      </animated.div>
    </div>
  );
};

export default Chain;
