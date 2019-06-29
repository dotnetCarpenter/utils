'use strict'

export function Functor () {}
Functor.prototype.fmap = function () { return this }

export function Maybe (v) {}
Maybe.prototype = new Functor

export function Just (v) {
  this._v = v
}
Just.prototype = new Maybe
Just.prototype.fmap = function (f) {
  return maybe(f(this._v))
}

export function Nothing () {}
Nothing.prototype = new Maybe

export function maybe (v) {
  return v instanceof Nothing || v == null ? new Nothing : new Just(v)
}
