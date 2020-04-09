'use strict'

let t = [ [ [ 'readMode', true ] ], [ [ 'version', true ] ] ]

console.log(
  flat(t),
  t.flat())
console.log(
  flat(t, 2),
  t.flat(2))

function flat(a, n = 1) {
  const accu = a.reduce((a,b) => a.concat(b), [])
  return n > 1
    ? flat(accu, n - 1)
    : accu
}

