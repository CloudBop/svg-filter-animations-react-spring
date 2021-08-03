import React, { useState } from 'react';
import './App.css';
import { Water } from './Components/Modules/';
import FogEffect from './Components/Modules/FogEffect/FogEffect';
import { DrawerWrapper } from './Components/UserInterface';
import Boxes_Fade_UseSprings from './Components/Boxes_Fade_UseSprings'
import Trail from './Components/Trail'
import TransitionBetweenComponents from './Components/TransitionComponent2Component'
import ChainBoxes from './Components/ChainBoxes'

// import { useAnimationFrame } from './hooks/useAnimationFrame';
function App() {
  const [ui, setUi] = useState({
    isOn: false
  });

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
          <Trail />
        </div>
      </div>

      <div
        style={{
          width: '100vw',
          height: '30vh',
          backgroundColor: '#44333a'
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TransitionBetweenComponents />
        </div>

      </div>

      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#333'
        }}
      >
        <span>Port doesn't work properly in v9, white box should animate width,height. could try transform</span>
        <ChainBoxes />
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
    </div>
  );
}

export default App;
