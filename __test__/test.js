'use strict'

/*
  I use font symbols to mark successfull/unsuccessfull
  tests. But the default Windows terminal only support
  a few characters. See below for more info.
  Supported font symbols on Windows
  https://github.com/microsoft/terminal/issues/387
*/

import debounce from '../debounce.js'
import lst from '../lst.js'

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

const tree = []
let index = 0
//let subIndex = 0
//let isTreeBuild = false
const doRun = debounce(() => { showTree(); run(tree); }, 16)

let exception
let showError = true
export function showTree () {
  console.log(tree)
  console.log(JSON.stringify(tree))
}
function run (nodes) {
  nodes.forEach((test, i) => {
    index = i
    if (test.waiting) {
      try {
        test.f()
      } catch (err) {}
      test.waiting = false
    }

    if (test.children) run(test.children)
  })
}

function addTest (node, test) {
  node.push(test)
}

export function it (description, f) {
  addTest(tree[index].children, { description, f, waiting: true })
  //addTest(lst(tree).children, { description, f, waiting: true })
  //lst(tree).sub.push({ description, f })
  //tree[index - 1].sub[subIndex++] = { description, f }
  doRun()
}
export function describe (description, f) {
  addTest(tree, { description, f, children: [], waiting: true })
  //tree.push({ description, f, sub: [] })
  //tree[index++] = { description, f, sub: [] }
  //subIndex = 0

  doRun()
/*
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
*/
}
