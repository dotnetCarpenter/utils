'use strict'

export function Functor () {}

export function Maybe (v) {}
Maybe.prototype = new Functor

export function Just (v) {}
Just.prototype = new Maybe

export function Nothing () {}
Nothing.prototype = new Maybe

export function maybe (v) {
  return v instanceof Nothing || v == null ? new Nothing : new Just(v)
}

// main()

// function main () {
//   printInstanceOf(maybe())
//   printInstanceOf(maybe(0))
// }

// function printInstanceOf (a) {
//   // log(a instanceof Functor, 'a instanceof Functor')
//   console.log(a instanceof Maybe, 'a instanceof Maybe')
//   console.log(a instanceof Just, 'a instanceof Just')
//   console.log(a instanceof Nothing, 'a instanceof Nothing')
// }
