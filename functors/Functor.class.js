export class Functor {
  constructor (v) {
    this._v = v
  }
}

export class Maybe {
  constructor (v) {
    const functor = v instanceof Nothing || null == v ? new Nothing : new Just(v)
    // console.log("**********************")
    // console.dir(functor)
    // console.dir(functor.__proto__)
    // console.dir(functor.__proto__.__proto__)
    // console.dir(functor.__proto__.__proto__.__proto__)
    // console.log("**********************")

    functor.__proto__.__proto__ = Object.create(Maybe.prototype)
    return functor
    // return v instanceof Nothing || null == v ? new Nothing : new Just(v)
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
    return new Maybe(x instanceof Just ? this.join(x) : x)
  }
}

export class Nothing extends Functor {
  fmap () {
    return this
  }
}
