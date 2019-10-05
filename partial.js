//@ts-check
'use strict'

/**
 * Binds arguments to a function.
 * @param {function} f
 * @param  {...any} xs
 * @returns {function}
 */
export default function partial (f, ...xs) { return f.bind(null, ...xs) }
