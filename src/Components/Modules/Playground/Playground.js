import React from 'react';
import { StyledPlayground } from './Playground.styled';
function Playground({ children }) {
  return <StyledPlayground>{children}</StyledPlayground>;
}

export default Playground;
