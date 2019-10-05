//@ts-check
'use strict'

/**
 * Like array.forEach but faster and easier to use in
 * functional programming, due to the argument order.
 * @param {function} f
 * @param {any[]} array
 * @returns {void}
 */
function each (f, array) {
  for (let n = 0, max = array.length; n < max; n++) {
    // NOTE: if you really have to work with sparse arrays then uncomment the line below (perf hit)
    // if (n in array) // skip uninitialized values e.i. sparse array
    f(array[n], n)
  }
}

export default each

// tests
// const a  = (function () {
//   const n = 10000
//   let a = new Array(n - 1)
//   for (let i = 0; i < n; i++) {
//     a[i] = i
//   }
//   return a
// }())

// each([1,2,,4], console.log)
