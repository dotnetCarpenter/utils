import each from './each'
import curry from './curry'

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
