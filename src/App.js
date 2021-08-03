import React, { useState } from 'react';
import './App.css';
import { Water } from './Components/Modules/';
import FogEffect from './Components/Modules/FogEffect/FogEffect';
import { DrawerWrapper } from './Components/UserInterface';
import Boxes_Fade_UseSprings from './Components/Boxes_Fade_UseSprings'
import Boxes_Animate_UseTrail from './Components/Boxes_Animate_UseTrail'
import TransitionTrailChainBoxes from './Components/TransitionTrailChainBoxes'
import TransitionBetweenComponents from './Components/TransitionComponent2Component'
import ChainBoxes from './Components/ChainBoxes'
import TransitionBoxes from './Components/TransitionBoxes'

import TextTransitionFromColinrTech from './Components/TransitionTrailChainNew/TransitionTrailChainBoxes'
import BoxExplosionChain from './Components/BoxExplosionChain/BoxExplosionChain';

// import { useAnimationFrame } from './hooks/useAnimationFrame';
function App() {
  const [ui, setUi] = useState({
    isOn: false
  });


  const [textTrailMessage, setTextTrailMessage] = useState('')
  const [textTrailMessageToAnimate, setTextTrailMessageToAnimate] = useState('')
  const [isTextAnimationOn, setIsTextAnimationOn] = useState(false)

  return (
    <div className="App">
      <header>
        <h1>React-Spring SVG Text effects </h1>
        <div>
          <p> A Playground for experimenting...</p>
          <DrawerWrapper>
            <h2>in drawer</h2>
          </DrawerWrapper>
        </div>
        <hr />
      </header>


      <button onClick={() => setUi(prev => !prev)}>click</button>
      <FogEffect
        filterID="title-filter"
        delay={200}
        animation={ui === true ? "fadeIn" : ""}>
        Foggy Fade
      </FogEffect>

      <Water />

      {/* <Granular /> */}

      {/* <SVGFilter /> */}
      <div className="full-width-height" style={{ display: "flex" }}>
        <div
          className="example-container-50"
        >
          <span>Fading boxes</span>
          <Boxes_Fade_UseSprings />
        </div>
        <div
          className="example-container-50"
        >
          <span>Trailing boxes</span>
          <Boxes_Animate_UseTrail />
        </div>
      </div>

      <div
        style={{
          width: '100vw',
          height: '20vh',
          backgroundColor: '#44333a',
          display: "flex",
          justifyContent: "center"

        }}
      >
        <TransitionBetweenComponents />
      </div>

      <div
        className={"example-container"}
      >
        <ChainBoxes />
      </div>
      <div
        className={"example-container"}
      >
        <span>TransitionBoxes</span>
        <TransitionBoxes />
      </div>
      <div
        className={"example-container"}
      >
        <span>ChainBox: doesn't work properly in v9...</span>
        <TransitionTrailChainBoxes />
      </div>
      {/* <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#333'
        }}
      >
        <h2>Chained Spring and Trail</h2>
        <ChainBoxes />
      </div> */}

      {/* <Grid /> */}

      <div className="example-container" style={{ color: 'purple' }}>

        <input type="text" value={textTrailMessage} onChange={(e) => setTextTrailMessage(e.target.value)} />
        <button onClick={() => {
          setTextTrailMessageToAnimate(textTrailMessage)
          setIsTextAnimationOn(true)

          setTimeout(() => {
            setIsTextAnimationOn(false)
          }, 2000);

        }}>update animation</button>

        {isTextAnimationOn ?
          <p>true</p> : <p>false</p>
        }

        <TextTransitionFromColinrTech on={isTextAnimationOn} message={textTrailMessageToAnimate} />
      </div>

      <div className="example-container">
        <BoxExplosionChain />
      </div>

    </div>
  );
}

export default App;
