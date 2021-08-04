import { useEffect } from "react"
export default function useCustomChain(toggle, array = []) {

  let [r1, r2] = array;

  useEffect(() => {
    // (async () => {
    if (toggle) {
      let [promise] = r1.start()


      promise.then(() => {

        r2.start()

      })
    } else {
      (function () {
        let p = r2.start()
        // console.log(promises)
        let finalitem = p.length - 1
        p?.[finalitem]?.then(() => r1.start())

      }())
    }
  }, [toggle, r1, r2])
}

// if (promiseLength === 1) {
//   promise?.[promiseLength - 1]
//     .then(() => //
//       transitionRef.start())
// }