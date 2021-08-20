import React, { useEffect, useState } from 'react';
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
import BoxExplosionChain from './Components/OfficialRepoExamples/BoxExplosionChain/BoxExplosionChain';
import TrailTextExample from './Components/OfficialRepoExamples/TrailTextExample/TrailTextExample'
import TransitionArray from './Components/OfficialRepoExamples/TransitionsExamplesHooks/TransitionArray'
import OnMountTransitions from './Components/OfficialRepoExamples/TransitionsExamplesHooks/OnMountTransitions'
import Toggle from './Components/OfficialRepoExamples/TransitionsExamplesHooks/ToggleBetweenComponents';
import ItemsTransition from './Components/OfficialRepoExamples/TransitionsExamplesHooks/SingleItemTransition';
import { AsyncExampleSpring as FlashingTextScripted, SpringChainExample } from './Components/AsyncExamples/FlashingTextScripted/FlashingTextScripted';
import FractalContainer from './Components/FractalTree/FractalContainer';
// import { useAnimationFrame } from './hooks/useAnimationFrame';
function App() {
  const [ui, setUi] = useState({
    isOn: false
  });


  const [textTrailMessage, setTextTrailMessage] = useState('')
  const [textTrailMessageToAnimate, setTextTrailMessageToAnimate] = useState('')
  const [isTextAnimationOn, setIsTextAnimationOn] = useState(false)

  useEffect(() => {

    // If there's a username to validate, schedule validation for
    // 500ms in the future.
    let timeout = setTimeout(() => {
      setIsTextAnimationOn(true)
    }, 500)

    let timeoff = setTimeout(() => {
      setIsTextAnimationOn(false)
    }, 1500)

    return () => {
      // If the timeout hasn't already run, then clear it, as it is
      // no longer needed.
      clearTimeout(timeout)
      clearTimeout(timeoff)
    }
  }, [textTrailMessage])

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

      {/* <TransitionArray /> */}


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
          // setTextTrailMessageToAnimate(textTrailMessage)
          setIsTextAnimationOn(true)

          setTimeout(() => {
            setIsTextAnimationOn(false)
          }, 2000);

        }}>update animation</button>

        {isTextAnimationOn ?
          <p>true</p> : <p>false</p>
        }

        <TextTransitionFromColinrTech on={isTextAnimationOn} message={textTrailMessage} />
      </div>

      <div className="example-container">
        <BoxExplosionChain />
      </div>



      <div className="example-container">
        <TrailTextExample />
      </div>

      <div className="example-container">
        <TransitionArray />
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <span>
            Toggle Between Components
          </span>
          <div>
            <Toggle />
          </div>
          <div style={{ margin: "1rem", padding: "1rem" }}>
            <SpringChainExample />
          </div>
          <div style={{
            // backgroundColor: "#393900",
            // margin: "1rem", padding: "5rem",
            // color: 'yellow'
          }}>
            {/* <FlashingTextScripted /> */}
          </div>
        </div>
        <div style={{ margin: "1rem", padding: "1rem" }}>
          <OnMountTransitions />
        </div>
      </div>

      <div className="example-container">
        <div style={{ position: 'relative', margin: "1rem", padding: "1rem", width: "100%", height: "100%" }}>
          <FractalContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
