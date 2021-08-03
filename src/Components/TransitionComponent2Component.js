import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';

function TransitionComponent2Component() {
  //
  const [toggle, toggleMoveMe] = useState(false);
  // useTransition(bool, items, object)
  // const transition = useTransition(toggle, null, {
  const transitions = useTransition(toggle, {
    from: { opacity: 0, position: 'absolute' },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  //
  return (
    <div style={{ position: 'relative' }}>
      {//
        transitions(
          // props is misleading here, they actual represent useTransition Object
          // ({ item, key, props }) =>
          (props, item, key) =>
            //
            item ? (
              //
              <animated.h2 key={key} style={props}>
                What's got four eyes but can't see ?
              </animated.h2>
            ) : (
              //
              <animated.h2 key={key} style={{ textTransform: "uppercase", ...props }}>
                Mississippi
              </animated.h2>
            )
        )
        //
      }
      <button onClick={() => toggleMoveMe(!toggle)}> Component To Component </button>
    </div>
  );
}

export default TransitionComponent2Component;
