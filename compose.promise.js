/**
 * Compose functions that can return a Promise.
 * If a Promise is returned then the next function will not be invoked until
 * the Promise is resolved.
 * @param {function[]} fs functions that can return a Promise
 * @returns {function(...function): Promise} A function that, when called, will start the chain of function invocations. Can be started with a Promise.
 */
// export default function compose (...fs) {
//     return initialValue => fs.reduceRight(
//         (x, f) => x.then(f),
//         Promise.resolve(initialValue)
//     )
// }

export default function compose (...fs) {
  return initialValue => fs.reduceRight(
    (x, f) => Promise.resolve(x).then(f),
    initialValue
  )
}

// export default function compose (...fs) {
//   return async initialValue => {
//     for (const f of fs) {
//       initialValue = await f(initialValue)
//     }
//   }
// }
