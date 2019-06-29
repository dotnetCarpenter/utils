'use strict'

import assert from 'assert'
assert.notOk = (expression, message) => {
  assert.ok(!expression, message)
}
export { assert }


export let log = (function (olog) {
  const messages = []

  keepMessages.flush = () => {
    messages.forEach(x => {
      Array.isArray(x) ? olog(...x) : olog(x)
    })

    keepMessages.clear()
  }

  keepMessages.top = (...msg) => {
    messages.unshift(msg)
  }

  keepMessages.clear = () => {
    messages.splice(0)
  }

  return keepMessages

  function keepMessages (...msg) {
    messages.push(msg)
  }
}(console.log))


let exception
let showError = true
export const it = describe
export function describe (description, f) {
  /*
  Supported font symbols on Windows
  https://github.com/microsoft/terminal/issues/387
  */
  showError = true

  try {
    f()
    if (exception) throw exception
    log.top('♥', description) // ✓
    log.flush()
  } catch (e) {
    exception = e

    if (showError) {
      log('  ', '↓', description) // ⚠
      log('  ', e)
      showError = false
    } else {
      log.top('↓', description)
      log.flush()
    }
  }
}
