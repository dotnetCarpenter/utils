'use strict'

import identity from '../identity.js'
import { describe, it, assert, log } from '../testLib/lib.js'

import { Functor, Maybe, Just, Nothing } from '../functors/Functor.class.js'

log('- Testing Functor.class.js', '\r\n')

describe('Functors must preserve identity morphisms', () => {
  // fmap id = id
  const actual = new Maybe(0).fmap(identity)
  const expected = identity(new Maybe(0))
  assert.deepEqual(actual, expected, 'fmap id = id')
})

describe('Functors preserve composition of morphisms', () => {
  // fmap (f . g)  ==  fmap f . fmap g')
  const expected = new Maybe(42)
  const add1 = a => a + 1
  const minus2 = a => a - 2

  let actual = new Maybe(add1(minus2(43)))
  assert.deepEqual(actual, expected)

  actual = new Maybe(43).fmap(add1).fmap(minus2)
  assert.deepEqual(actual, expected)
})

describe('Functors have a type', () => {

  it('new Maybe', () => {
    const actual = new Maybe
    assert.ok(actual instanceof Functor, 'a instanceof Functor')
    assert.ok(actual instanceof Maybe, 'a instanceof Maybe')
    assert.notOk(actual instanceof Just, 'a instanceof Just')
    assert.ok(actual instanceof Nothing, 'a instanceof Nothing')
    printInstanceOf(actual)
  })

  it('new Maybe(21)', () => {
    const actual = new Maybe(21)
    assert.ok(actual instanceof Functor, 'a instanceof Functor')
    assert.ok(actual instanceof Maybe, 'a instanceof Maybe')
    assert.ok(actual instanceof Just, 'a instanceof Just')
    assert.notOk(actual instanceof Nothing, 'a instanceof Nothing')
    printInstanceOf(actual)
  })
})

function printInstanceOf (a) {
  log(a instanceof Functor, 'a instanceof Functor')
  log(a instanceof Maybe, 'a instanceof Maybe')
  log(a instanceof Just, 'a instanceof Just')
  log(a instanceof Nothing, 'a instanceof Nothing')
}
