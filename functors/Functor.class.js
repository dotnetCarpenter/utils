export class Functor {
  constructor (v) {
    this._v = v
  }
}

export class Maybe extends Functor {
  constructor (v) {
    return v instanceof Nothing || null == v ? new Nothing : new Just(v)
    // functor.prototype = Maybe.prototype
    // return functor
  }
}

export class Just extends Functor {
  constructor (v) { super(v) }

  fmap (f) {
    return new Maybe (f(this._v))
  }

  join () {
    let x
    this.fmap(v => { x = v })
    return Maybe(x instanceof Just ? this.join(x) : x)
  }
}

export class Nothing extends Functor {
  constructor () { super() }
  fmap () {
    return this
  }
}
