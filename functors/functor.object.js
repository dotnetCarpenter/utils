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
        if (v instanceof Functor) console.log("yes yes")
        return Functor(f(v))
      }
    }
  })
}

export function Maybe (v) {
  return v instanceof Nothing || null == v ? Nothing() : Just(v)
}

export function Just (v) {
  return Object.create(Functor(v))
}

export function Nothing () {
  return Object.create(Functor(), {
    fmap: {
      value () { return this }
    }
  })
}
