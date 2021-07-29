import React from 'react';
import SVGFilter from './SVGFilter';
import { useInput } from '../../../hooks/useInput';
function Granular() {
  const { value, setValue } = useInput(true);

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <h2> A Smashed effect</h2>
        <button onClick={() => setValue(prev => !prev)}>Toggle</button>
      </header>
      <SVGFilter isOn={value} />
    </div>
  );
}

export default Granular;
