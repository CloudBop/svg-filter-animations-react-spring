import React from 'react';
import {
  animated,
  // useTrail,
  // useSpring,
  // useChain,
  useTransition,
  useSpringRef,
  // config
} from 'react-spring';
// mimic array of component, using item[idx] as key
// import { StyledTransitionTrail } from './TransitionTrail.styled';
// this limits the maximum length of message
// const items = [0, 1, 2, 3, 4, 5, 6, 7];
// const messageTest = 'Welcome';


const Chain = ({ on, message }) => {
  const msg = (message && message.split('')) || 'Welcome'.split('');

  let items = msg.map((item, idx) => {
    return idx
  });
  // const [on, toggle] = useState(false);
  // store refs in component
  const springRef = useSpringRef();
  // const { size } = useSpring({
  //   ref: springRef,
  //   to: { size: on ? '100%' : '0%' },
  //   from: { size: on ? '100%' : '0%' }
  // });
  //
  // const props = useSpring({
  //   ref: springRef,
  //   opacity: on ? 1 : 0,
  //   config: config.molasses,
  //   clamp: true,
  //   // delay: 0
  // })
  // //
  // const transitionRef = useSpringRef();
  const transition = useTransition(on ? items : [], {
    trail: 500 / items.length,
    // ref: transitionRef,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
  });
  //
  //
  // useChain([springRef, transitionRef]);
  // - was tracking state of component via toggle state type
  // useEffect(() => {
  //   // this will clear Timeout when component unmont like in willComponentUnmount
  //   let timer1 = setTimeout(() => toggle(true), 100);
  //   return () => {
  //     clearTimeout(timer1);
  //   };
  // }, []);
  return (

    <div style={{
      fontSize: "2rem", color:
        "white"
    }}>
      {transition((aniProps, key, item) => (
        <animated.span key={key} className="" style={aniProps}>
          {/* {console.log({ aniProps, key, item, })} */}
          {msg[key]}
        </animated.span>
      ))}
    </div>
  );
};

export default Chain;
