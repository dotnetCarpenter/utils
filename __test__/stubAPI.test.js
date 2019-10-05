//@ts-check

'use strict'

import { describe, it, assert, log } from '../testLib/lib.js'
import API from '../bad_API/stubAPI.js'

log('- Testing stubAPI.js', '\r\n')

describe('stubAPI.nothing()', () => {
  it('.nothing() return null', () => {
    assert.ok(API.nothing() == null)
  })
})

describe('stubAPI.itemsForSure()', () => {
  it('is an array it must be between 0 and 10 inclusive', () => {
    const expected = val => val.length >= 0 && val.length <= 10
    const actual = API.itemsForSure()
    assert.ok(expected(actual), `.itemsForSure() has ${actual.length} items`)
  })
})

describe('stubAPI.items()', () => {
  it('is an array or undefined', () => {
    const expected = val => Array.isArray(val) || val == null
    const actual = API.items()
    assert.ok(expected(actual), 'stubAPI.items() is not an array or undefined')
  })

  it('must return undefined sometimes', () => {
    let undefinedFound = false

    for (let i = 20; i >= 0; --i) {
      let actual = API.items()
      if (actual == null) {
        undefinedFound = true
        break
      }
    }

    if (undefinedFound) assert.ok(true)
    else assert.ok(false, 'undefined was not returned')
  })

  it('must not throw a RangeError', () => {
    for (let i = 10000; i >= 0; --i) {
      try {
        let actual = API.items()
      } catch (error) {
        if (error instanceof RangeError) assert.ok(false, error)
      }

    }
    assert.ok(true)
  })
})
