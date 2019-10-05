//@ts-check
'use strict'

/**
 *
 * @param {number} upper Upper limit inclusive
 * @param {number} lower Lower limit
 */
export function random (upper = 65535, lower  = 0) {
  return lower + Math.floor(Math.random() * (upper - lower + 1))
}
