/**
 * Returns an array of tuples (two dimensional arrays) by combining two arrays
 * but let you transform the values via a callback function.
 * @param {function} f The callback function will be called with two arguments, corresponding to each element from the two arrays
 * @param {array} xs The first array to zip - zip will stop when there is no more elements in the first array (xs)
 * @param {array} ys The second array to zip
 * @returns {array[]}
 */
export default function zipWith (f, xs, ys) {
  if (xs.length === 0) return []
  if (ys.length === 0) return []

  let x = xs[0]
  let y = ys[0]

  xs = xs.slice(1)
  ys = ys.slice(1)
  return [f(x, y)].concat(zipWith(f, xs, ys))
}
