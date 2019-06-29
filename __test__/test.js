'use strict'

/*
  I use font symbols to mark successfull/unsuccessfull
  tests. But the default Windows terminal only support
  a few characters. See below for more info.
  Supported font symbols on Windows
  https://github.com/microsoft/terminal/issues/387
*/

import debounce from '../debounce.js'

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


class TestLeaf {
  constructor (description, f) {
     this.description = description
     this.f = f
     this.waiting = true
     this.status = false
     this.error
     this.parent
  }
}
class TestNode extends TestLeaf {
  constructor (description, f) {
    super(description, f)

    this.children = []
    delete this.parent
  }
}

const TIMEOUT = 16
const tree = []
let currentIndex = 0
const doRun = debounce(() => { run(tree) }, TIMEOUT)
const doneRunning = debounce(() => { showResults(tree, 0); log.flush() }, TIMEOUT)

function showTree () {
  console.log(tree)
  console.log(JSON.stringify(tree))
}

function showResults (nodes, level) {
  nodes.forEach(test => {
    if (test.status) {
      log('♥'.padStart(level), test.description) // ✓
    } else {
      log('↓'.padStart(level), test.description) // ⚠
      if (test.error) log(test.error) // could be a child test who has the error
    }

    if (test.children) showResults(test.children, level + 4)
  })
}

function run (nodes) {
  nodes.forEach((test, i) => {

    currentIndex = i

    if (test.waiting) {

      try {
        test.f()
        test.status = true
      } catch (err) {
        test.status = false
        test.error = err
        if (test.parent) test.parent.status = false
      }

      test.waiting = false
    }

    if (test.children) run(test.children)
  })

  doneRunning()
}

function addTest (node, test) {
  node.push(test)
}

export function it (description, f) {
  const test = new TestLeaf(description, f)
  test.parent = tree[currentIndex]
  addTest(test.parent.children, test)

  doRun()
}
export function describe (description, f) {
  addTest(tree, new TestNode(description, f))

  doRun()
}
