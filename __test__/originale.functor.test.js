'use strict'

import identity from '../identity.js'
import { describe, it, assert, log } from './test.js'
import { maybe, just, nothing, fmap, join } from '../functors.js'

log('functors.js', '\r\n')

describe('Functors have a type', () => {
  it('maybe() is of type nothing but not just', () => {
    const actual = maybe()
    assert.notOk(actual instanceof just, 'a instanceof just')
    assert.ok(actual instanceof nothing, 'a instanceof nothing')

    // printInstanceOf(actual)
  })

  it('maybe(21) is of type just but not nothing', () => {
    const actual = maybe(21)
    assert.ok(actual instanceof just, 'a instanceof just')
    assert.notOk(actual instanceof nothing, 'a instanceof nothing')

    // printInstanceOf(actual)
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
