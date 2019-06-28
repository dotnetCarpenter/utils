'use strict'

import curry from './curry.js'

const type = {
  nothing: 1,
  just: 2,
}

export function maybe (v) {
  // return v instanceof nothing || null == v ? nothing() : just(v)
  const ftype = v instanceof nothing || null == v ? type.nothing : type.just
  const Maybe = Object.create(maybe.prototype)
  Maybe.prototype = Object.create(ftype.nothing ? nothing() : just(v))
  Maybe.prototype.constructor = Maybe.prototype.__proto__.constructor

  console.log(Object.getPrototypeOf(Maybe))
  console.log(Object.getPrototypeOf(Maybe.prototype))

  return Maybe
}

export function just (v) {
  return Object.create(just.prototype, {
    fmap: { value(f) { return just(f(v)) } },
    valueOf: { value() { return v } },
    toString: { value() { return String(v) } },
    join: {
      value() {
        let x
        this.fmap(v => { x = v })
        return maybe(x instanceof just ? this.join(x) : x)
      }
    }
  })
}

export function nothing () {
  return Object.create(nothing.prototype, {
    fmap: { value() { return this /* nothing() */ } },
    valueOf: { value() { return null } },
    toString: { value() { return '' } },
    join: { value() { return this } },
  })
}

export const fmap = curry( (f, v) => maybe(v).fmap(f) )

/**
 * Unwrap nested functors
 * @param {maybe|just|nothing} functor A functor with map
 * @returns {maybe} A value wrapped in a functor
 */
export function join (functor) {
  let x
  functor.fmap(v => { x = v })
  return maybe(x instanceof just ? join(x) : x)
}
