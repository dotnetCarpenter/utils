'use strict'

import identity from '../identity.js'
import { describe, it, assert, log } from './test.js'

// import { Functor, Maybe, Just, Nothing } from '../functors/Functor.object.js'
// import { Functor, Maybe, Just, Nothing } from '../functors/Functor.class.js'
import { maybe, just, nothing } from '../functors.js'

// console.log(FILENAME, '\r\n')

describe('Functors must preserve identity morphisms', () => {
  // fmap id = id
  const actual = new maybe(0).fmap(identity)
  const expected = identity(new maybe(0))
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

describe('Functors have a type', () => {

  it('new maybe', () => {
    const actual = new maybe
    // assert.ok(actual instanceof Functor, 'a instanceof Functor')
    assert.ok(actual instanceof maybe, 'a instanceof maybe')
    assert.notOk(actual instanceof just, 'a instanceof just')
    assert.ok(actual instanceof nothing, 'a instanceof nothing')
    printInstanceOf(actual)
    log.flush()
  })

  it('new maybe(21)', () => {
    const actual = new maybe(21)
    // assert.ok(actual instanceof Functor, 'a instanceof Functor')
    assert.ok(actual instanceof maybe, 'a instanceof maybe')
    assert.ok(actual instanceof just, 'a instanceof just')
    assert.notOk(actual instanceof nothing, 'a instanceof nothing')
    printInstanceOf(actual)
    log.flush()
  })
})

function printInstanceOf (a) {
  // log(a instanceof Functor, 'a instanceof Functor')
  log(a instanceof maybe, 'a instanceof maybe')
  log(a instanceof just, 'a instanceof just')
  log(a instanceof nothing, 'a instanceof nothing')
}
