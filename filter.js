import each from './each.js'
import curry from './curry.js'

function filter (f, array) {
  const a = []

  each((i, n) => {
    const val = f(i, n)
    if (val) {
      a.push(i)
    }
  }, array)

  return a
}

export default curry(filter)
