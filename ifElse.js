/**
 * Given a predicate function, will call wither i or e.
 * @param {function} predicate
 * @param {function} i Function to invocate if the predicate is truthy
 * @param {function} e Function to invocate if the predicate is falsy
 * @returns {function}
 */
export default function ifElse (predicate, i, e) {
  return x => predicate(x) ? i(x) : e(x)
}