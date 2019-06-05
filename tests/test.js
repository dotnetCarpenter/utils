'use strict'

import assert from 'assert'

assert.notOk = (expression, message) => {
  assert.equal(!!expression, message)
}

export {assert}

export function describe (description, f) {
  /*
  Supported font symbols on Windows
  https://github.com/microsoft/terminal/issues/387
  */
  try {
    f()
    console.log('♥', description) // ✓
  } catch (e) {
    console.error('↓', description) // ⚠
    console.error(e)
    // throw e
  }
}

export const it = describe
