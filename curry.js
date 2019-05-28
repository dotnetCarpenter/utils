/**
 * Returns a new function where some of the arguments are pre defined.
 * @param {function} f The function to partially apply arguments to
 * @param {number} [arity] Optionally specify how many arguments the
 * function f will take, before being called. Useful for variadic functions
 * or partial apply monadadic function.
 * @example
 * // returns 10
 * const add2 = curry(x => x + 2, 2)
 * const add5 = add2(3)
 * add5(5)
 * @returns {function}
 */
export default function curry (f, arity) {
  let n = arity || f.length

  return function $curry (...xs) {
    // if (n < xs.length) throw new TypeError((f.name || 'anonymous') + ' does not accept ' + xs.length + ' arguments')
    return n > xs.length ? $curry.bind(f, ...xs) : f.apply(undefined, xs)
  }
}
