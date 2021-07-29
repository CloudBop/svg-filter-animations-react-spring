import React, { useState } from 'react';
import Drawer from '../Drawer';
function DrawerWrapper({ children }) {
  const [ isOpen, toggleOpen ] = useState(false);
  console.log('isOpen', isOpen);
  const toggle = () => {
    console.log('click', isOpen);
    toggleOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggle}>react-spring config settings</button>
      <Drawer isOpen={isOpen} cb={toggle} children={children} />
    </div>
  );
}

export default DrawerWrapper;
