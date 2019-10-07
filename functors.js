import curry from './curry.js'

export function maybe (v) {
  return v instanceof nothing || null == v ? nothing() : just(v)
}

export function just (v) {
  return Object.create(just.prototype, {
    /** @param {function} f; @returns {just} */
    fmap: { value(f) { return just(f(v)) } },
    valueOf: { value() { return v } }
  })
}

export function nothing () {
  return Object.create(nothing.prototype, {
    fmap: { value() { return nothing() } },
    valueOf: { value() { return null } }
  })
}

export const fmap = curry( (f, v) => maybe(v).fmap(f) )

/**
 * Unwrap nested functors
 * @param {maybe|just|nothing} functor An object with fmap
 * @returns {maybe} A value wrapped in a functor
 */
export function unwrap (functor) {
  let x
  functor.fmap(v => { x = v })
  return maybe(x instanceof just ? unwrap(x) : x)
}
