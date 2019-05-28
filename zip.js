import zipWith from './zipWith'

/**
 * Returns an array of tuples (two dimensional arrays) by combining two arrays.
 * @example [a] -> [b] -> [(a, b)] = zip([1], [2]) -> [[1,2]]
 * @param {array} a The first array to combine - zip will stop when there is no more elements in the first array
 * @param {array} b The second array to combine
 * @returns {array[]}
 */
export default function zip (a, b) {
  return zipWith((x, y) => [x, y], a, b)
}

/* test
let a = [1,2,3]
let b = [4,5,6,7]
console.log(zip(a, b), '-> [ [1,4],[2,5],[3,6] ]')
*/
