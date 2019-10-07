//@ts-check
'use strict'

import each from './each.js'
import curry from './curry.js'

/**
 * @param {{map<U>(f: (value: U, index: number) => U): U[];}} f
 * @param {any[] | string[] | number[] | boolean[]} array
 * @returns {any[] | string[] | number[] | boolean[]}
 */
function map (f, array) {
  const a = new Array(array.length)

  each(
    /** @param {any} i; @param {number} n */
    (i, n) => {
    a[n] = f(i, n)
  }, array)

  return a
}

export default curry(map)
