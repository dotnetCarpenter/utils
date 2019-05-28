import each from './each.js'
import curry from './curry.js'

function map (f, array) {
  const a = new Array(array.length)

  each((i, n) => {
    a[n] = f(i, n)
  }, array)

  return a
}

export default curry(map)
