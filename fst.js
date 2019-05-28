/**
 * Safely return the first element of an array.
 * If the element is undefined or the array is empty
 * fst will return null.
 * @param {[*]} array
 * @returns {[]|null}
 */
export default function fst (array) {
    const first = array.length > 0 ? array[0] : null
    return first != null ? first : null
}
