'use strict'

import identity from '../identity.js'
import { describe, it, assert, log } from './test.js'
import { maybe, Functor, Maybe, Just, Nothing } from '../functors/Functor.classic.js'

log('Functor.classic.js', '\r\n')

describe('Functors have a type', () => {
  it('maybe() is type of Functor, Maybe and Nothing but not Just', () => {
    const actual = maybe()
    assert.ok(actual instanceof Functor, 'a instanceof Functor')
    assert.ok(actual instanceof Maybe, 'a instanceof Maybe')
    assert.notOk(actual instanceof Just, 'a instanceof Just')
    assert.ok(actual instanceof Nothing, 'a instanceof Nothing')

    printInstanceOf(actual)
  })

  it('maybe(21) is type of Functor, Maybe and Just but not Nothing', () => {
    const actual = maybe(21)
    assert.ok(actual instanceof Functor, 'a instanceof Functor')
    assert.ok(actual instanceof Maybe, 'a instanceof Maybe')
    assert.ok(actual instanceof Just, 'a instanceof Just')
    assert.notOk(actual instanceof Nothing, 'a instanceof Nothing')

    printInstanceOf(actual)
  })
})

describe('Functors must preserve identity morphisms', () => {
  // fmap id = id
  const actual = maybe(0).fmap(identity)
  const expected = identity(maybe(0))
  assert.deepEqual(actual, expected, 'fmap id = id')
})

describe('Functors preserve composition of morphisms', () => {
  // fmap (f . g)  ==  fmap f . fmap g')
  const expected = new maybe(42)
  const add1 = a => a + 1
  const minus2 = a => a - 2

  let actual = new maybe(add1(minus2(43)))
  assert.deepEqual(actual, expected)

  actual = new maybe(43).fmap(add1).fmap(minus2)
  assert.deepEqual(actual, expected)
})

function printInstanceOf (a) {
  log(a instanceof Functor, 'a instanceof Functor')
  log(a instanceof Maybe, 'a instanceof Maybe')
  log(a instanceof Just, 'a instanceof Just')
  log(a instanceof Nothing, 'a instanceof Nothing')
}
