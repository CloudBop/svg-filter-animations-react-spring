
import { useSpring, config, animated } from 'react-spring'

export function AsyncExampleSpring() {
  const styles = useSpring({
    // When using an async to function inside a component that renders frequently, you'll need to memoize your to function to prevent an unintended restart.
    // One solution is to use the useCallback hook.
    // to: useCallback(async next => { ... }, []),
    // Another solution is to pass a props function.
    to: async (next, cancel) => {
      await next({ opacity: 1, color: '#ffaaee' })
      await next({ opacity: 0, color: 'rgb(14,26,19)' })
    },
    // from: { opacity: 0, color: "#5bb0ff" },
  })

  //props function useSpring( ()=>({to: async next=>{}})  )
  // ...
  return <animated.div style={styles}>I will fade in and out</animated.div>
}

export function SpringChainExample() {
  const styles = useSpring({
    loop: true,
    to: [
      { opacity: 1, color: '#ffaaee' },
      { opacity: 0, color: 'rgb(14,26,19)' },
    ],
    from: { opacity: 0, color: 'red' },
  })
  // ...
  return <animated.div style={styles}>I will fade in and out</animated.div>
}