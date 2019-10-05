//@ts-check
'use strict'

import { random } from './random.js'

/**
 * @returns {string}
 */
export function randomChar () {
  return String.fromCharCode(random())
}

/**
 * @param {function} f
 * @param {number} length
 * @returns {any[]}
 */
export function rangeWith (f, length) {
  if (length < 0 || (length|0) !== length) throw RangeError('length must be an positive integer')
  return rangeGenerator(f, length)
}

/**
 * @param {any} value
 * @param {number} length
 */
export function range (value, length) {
  if (length < 0 || (length|0) !== length) throw RangeError('length must be an positive integer')
  return rangeGenerator(() => value, length)
}

/**
 * @param {function} f
 * @param {number} length
 * @param {any[]} accumulator
 */
function rangeGenerator (f, length, accumulator = []) {
  try {
    accumulator.push(f())
    return length === 1
      ? accumulator
      : rangeGenerator(f, --length, accumulator)
  } catch (error) {
    debugger
  }
}
