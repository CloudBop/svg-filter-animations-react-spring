import React, { useState } from 'react';
import './App.css';
import { Water, Granular } from './Components/Modules/';
import { DrawerWrapper } from './Components/UserInterface';
import Grid from './Components/Modules/Grid';
import SVGFilter from './Components/Modules/Granular/SVGFilter';
import FogEffect from './Components/Modules/FogEffect/FogEffect';

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

      <FogEffect
        filterID="title-filter"
        delay={200}
        animation="fadeIn">
        Foggy Fade
      </FogEffect>

      <Water />

      <Granular />

      {/* <SVGFilter /> */}

      <Grid />
    </div>
  );
}

export default App;
