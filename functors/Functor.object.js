'use strict'

export function Functor (v) {
  return Object.create(Functor.prototype, {
    /**
   * fmap :: (a -> b) -> f a -> f b
   * Create a new f b, from an f a using the results
   * of calling a function on every value in the f a.
   */
    fmap: {
      value (f) {
        // if (v instanceof Functor) console.log("yes yes")
        return Functor(f(v))
      }
    }
  })
}

export function Maybe (v) {
  const functor = v instanceof Nothing || v == null ? Nothing() : Just()
  Object.setPrototypeOf(functor.__proto__, Maybe.prototype)
  Object.setPrototypeOf(functor.__proto__.__proto__, Functor(v))
  return functor
}

export function Just () {
  return Object.create(Just.prototype)
}

export function Nothing () {
  return Object.create(Nothing.prototype, {
    fmap: {
      value () { return this }
    }
  })
}
