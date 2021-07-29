import React from 'react';
import { DrawerContainer, LeftDrawer, RightDrawer } from './StyledDrawer';
import { useSpring, animated, config } from 'react-spring';
//
const AniLeft = animated(LeftDrawer);
const AniRight = animated(RightDrawer);

function Drawer({ isOpen, cb, children }) {
  const { x } = useSpring({
    // reuses x value without needing two seperate from
    x: isOpen ? 0 : 100,
    config: { clamp: true, ...config.gentle }
    // transform: isNavOpen ? 'translate3d(0,0,0) scale(1)' : 'translate3d(-100%,0,0) scale(0.25)'
    // transform: isNavOpen ? 'translate3d(0,0,0) scale(1)' : 'translate3d(0,0,0) scale(0.25)'
  });

  return (
    <DrawerContainer
      style={{
        // hack for controlling overlay... if open use overlay else none.
        pointerEvents: isOpen ? 'all' : 'none'
      }}
    >
      <AniLeft
        style={{
          transform: x.interpolate(x => `translate3d(${x * -1}%, 0, 0)`)
        }}
      />
      <AniRight
        style={{
          transform: x.interpolate(x => `translate3d(${x}%, 0, 0)`)
        }}
      >
        <button onClick={cb}>
          <h2>Close</h2>
        </button>
        <div>{children}</div>
      </AniRight>
    </DrawerContainer>
  );
}

export default Drawer;
