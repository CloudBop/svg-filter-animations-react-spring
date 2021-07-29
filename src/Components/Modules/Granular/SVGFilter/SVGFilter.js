import React, { Fragment } from 'react';
import { StyledSVG } from './SVGFilter.styled';
import { useSpring, animated, config } from 'react-spring';
import AffectedText from '../AffectedText/AffectedText';
//
const AnimFeTurbulence = animated('feTurbulence');
const AniStyledSVG = animated(StyledSVG);
const AniDistantLight = animated('feDistantLight');
//
function SVGFilter({ isOn, duration = 500, delay = 0 }) {
  // freq 0.02 to 0.2  gd starting poing
  const { freq, seed, transform, azimuth, opacity } = useSpring({
    reverse: isOn,
    from: { seed: 0, opacity: 1, cent: 0, transform: 'scale(0.5)', freq: '0.0000, 0.0000', azimuth: 0 },
    to: { seed: 0, opacity: 0, cent: 100, transform: 'scale(1)', freq: '0.120050, 0.23000', azimuth: 20 },
    config: {
      tension: 180,
      friction: 51,
      velocity: 10
    },
    delay: delay
  });
  console.log('freq', freq);
  return (
    <Fragment>
      <AniStyledSVG
        fill="#62558a"
        // transform={transform}
        viewBox="0 0 1278 446"
      >
        <filter id="filter">
          {
            <AnimFeTurbulence
              // type="turbulence"
              baseFrequency={freq}
              numOctaves={'1'}
              seed={seed}
              type="turbulence"
              stitchTiles="stitch"
              result="turbulence"
            />
          }
          {
            //
            <feColorMatrix type="saturate" values="30" in="turbulence" result="colormatrix" />
          }
          {
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 150 -15"
              in="colormatrix"
              result="colormatrix1"
            />
          }
          {
            //
            <feComposite in="SourceGraphic" in2="colormatrix1" operator="in" result="composite" />
          }
          {
            <feDisplacementMap
              in="SourceGraphic"
              in2="colormatrix1"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="A"
              result="displacementMap"
            />
          }

          {
            <feDiffuseLighting in="noise" lightingColor="snow" surfaceScale="3">
              {<AniDistantLight azimuth={azimuth} elevation="90" />}
            </feDiffuseLighting>
          }
        </filter>
      </AniStyledSVG>
      
      <AffectedText />
    </Fragment>
  );
}

export default SVGFilter;
