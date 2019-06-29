/**
 * Safely return the first element of an array.
 * If the element is undefined or the array is empty
 * fst will return null.
 * @param {[*]} array
 * @returns {*|null}
 */
export default function fst (array) {
  if (array.length === 0) return null
  if (array[0] == null) return null
  return array[0]
}

// test
/*console.log(fst([]) === null)
console.log(fst([,]) === null)
console.log(fst([0]) === 0)
console.log(fst([0,1]) === 0)
*/
