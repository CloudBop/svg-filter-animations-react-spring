import React from 'react';
import styled from 'styled-components';
import { useSpring, animated as a } from 'react-spring';

const Title = styled.h1`
  background: #000;
  color: #FFF;
  position: relative;
  text-align: center;
  margin: 40px auto 30px;
  font-size: 6vw;
  width: 42vw;
  z-index:2;
`;

const Fog = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
`;

function FogEffect({
  children,
  filterID,
  delay = 1000,
  duration = 2000,
  frequency = 0.014,
  seed = 13,
  animation = 'fadeIn'
}) {
  const AnimColorMatrix = a('feColorMatrix');

  const { val } = useSpring({
    to: { val: animation === 'fadeIn' ? 0 : 7 },
    from: { val: animation === 'fadeIn' ? 7 : 0 },
    config: { duration: duration },
    delay: delay
  });

  return (
    <Title>
      {children}
      <Fog xmlns="http://www.w3.org/2000/svg">
        <filter id={filterID}>
          <feTurbulence baseFrequency={frequency} numOctaves="4" seed={seed} type="fractalNoise" result="turbulence" />
          <AnimColorMatrix
            type="matrix"
            in="turbulence"
            result="gray"
            values={val.interpolate(
              c =>
                `0 0 ${c} 0 ${c} 
                 0 0 ${c} 0 0 
                 ${c} 0 ${c} 0 0 
                 0 0 0 1 0`
            )}
          />

          <feColorMatrix in="gray" type="luminanceToAlpha" />
        </filter>
        <rect x="0" y="0" width="100%" height="100%" filter={`url(#${filterID})`} fill="none" />
      </Fog>
    </Title>
  );
}

export default FogEffect;
