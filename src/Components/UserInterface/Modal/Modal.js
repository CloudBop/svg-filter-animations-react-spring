import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring';

const Modal = ({ closeModal, animation, pointerEvents }) => {
  return (
    <div className="modal" style={{ pointerEvents }}>
      <animated.div className="modal-card" style={animation}>
        <button onClick={closeModal}>Close</button>
        <h1>Modal</h1>
      </animated.div>
    </div>
  );
};

const ModalWrapper = () => {
  const [on, toggle] = useState(false);
  const transition = useTransition(on ? [""] : [], {
    from: { opacity: 0, transform: 'translate3d(0, -90px, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -90px, 0)' }
  });
  //
  const pointerEvents = on ? 'all' : 'none';
  //
  return (
    <div>
      <button onClick={() => toggle(!on)}>Open Modal</button>
      {transition(
        (aniProps, key, item) =>
          item && (
            <Modal key={key} pointerEvents={pointerEvents} animation={aniProps} closeModal={() => toggle(false)} />
          )
      )}
    </div>
  );
};

export default ModalWrapper;
