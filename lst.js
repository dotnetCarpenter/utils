/**
 * Safely return the last element of an array.
 * If the element is undefined or the array is empty
 * lst will return null.
 * @param {[*]} array
 * @returns {*|null}
 */
export default function lst (array) {
  if (array.length === 0) return null
  if (array[array.length - 1] == null) return null
  return array[array.length - 1]
}

// test
/*
console.log(lst([]) === null)
console.log(lst([,]) === null)
console.log(lst([0]) === 0)
console.log(lst([0,1]) === 1)
console.log(lst([0,undefined]) === null)
console.log(lst([0,]) === 0)
*/
