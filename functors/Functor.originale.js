'use strict'

import curry from '../curry.js'

export function maybe (v) {
  const functor = v instanceof nothing || null == v ? nothing() : just(v)
  functor.__proto__.__proto__ = Object.create(maybe.prototype)
  return functor
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
 * @param {maybe|just|nothing} functor A functor with fmap
 * @returns {maybe} A value wrapped in a functor
 */
export function join (functor) {
  let x
  functor.fmap(v => { x = v })
  return maybe(x instanceof just ? join(x) : x)
}
