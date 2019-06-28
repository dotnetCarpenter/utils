'use strict'

//debug info
;(globalThis || this || global).FILENAME = 'Functor.object.js'

export function Functor (v) {
  return {
    /**
   * fmap :: (a -> b) -> f a -> f b
   * Create a new f b, from an f a using the results
   * of calling a function on every value in the f a.
   */
    fmap (f) {
      // if (v instanceof Functor) console.log("yes yes")
      return Maybe(f(v))
    }
  }
}

export function Maybe (v) {
  let functor
  if (v instanceof Nothing || null == v) {
    // functor = Nothing()
    // functor.prototype = Object.create(Maybe.prototype)
    // functor.prototype.prototype = Object.create(Functor())
    // functor = inherite([Maybe.prototype, Functor(v)], Nothing())
    functor = Nothing()
    functor.prototype = Object.create(Maybe.prototype)
    functor.prototype.prototype = Object.create(Functor())
  } else {
    // functor = Just(v)
    // functor.__proto__.__proto__ = Object.create(Maybe.prototype)
    // functor.__proto__.__proto__.__proto__ = Object.create(Functor(v))
    // functor = inherite([Maybe.prototype, Functor(v)], Just(v))
    functor = Just(v)
    functor.prototype = Object.create(Maybe.prototype)
    functor.prototype.prototype = Object.create(Functor(v))
  }
  // const functor = v instanceof Nothing || null == v ? Nothing() : Just(v)
  return functor
}

export function Just (v) {
  // return inherite([Functor(v), Maybe.prototype], Just.prototype)
  return Object.create(Just.prototype)
}

export function Nothing () {
  return Object.create(Nothing.prototype, {
    fmap: {
      value () { return this }
    }
  })
  // return inherite([Functor(), Nothing.prototype], {
  //   fmap: {
  //     value () { return this }
  //   }
  // })
}

function inherite (prototypes, object) {
  // if (prototypes.length === 0) return object

  return prototypes.map((p, i) => {
    object.prototype = Object.create(p)

  })

  inherite(prototypes.splice(0, 1), object.prototype)
  return object
}

function t () {

}

function inherite2 (prototypes, object) {
  if (prototypes.length === 0) return object

  const p = prototypes[0]
  object.__proto__ = {
    contructor: p
  }

  inherite(prototypes.slice(1), object.__proto__)

  return object
}
