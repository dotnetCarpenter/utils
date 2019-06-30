'use strict'

/*
  I use font symbols to mark successfull/unsuccessfull
  tests. But the default Windows terminal only support
  a few characters. See below for more info.
  Supported font symbols on Windows
  https://github.com/microsoft/terminal/issues/387
*/

import debounce from '../debounce.js'
import each from '../each.js'

import assert from 'assert'
assert.notOk = (expression, message) => {
  assert.ok(!expression, message)
}
export { assert }

class AbstractTest {
  constructor (description, f) {
     this.description = description
     this.f = f
     this.waiting = true
     this.status = false
     this.error
     this.log = []
  }
}

class TestLeaf extends AbstractTest {
  constructor (description, f) {
    super(description, f)
    this.parent
 }
}

class TestNode extends AbstractTest {
  constructor (description, f) {
    super(description, f)
    this.children = []
  }
}

const TIMEOUT = 16
const tree = []
let currentNode
let exitCode = 0

const doRun = debounce(() => { run(tree) }, TIMEOUT)
const doneRunning = debounce(() => {
  collectResults(tree)
  // console.log(tree)
  print(tree, log.get())
  process.exit(exitCode)
}, TIMEOUT)

function run (nodes) {
  traverseTree(test => {
    if (test.waiting) {

      try {
        test.f()
        test.status = true
      } catch (err) {
        exitCode = 1
        test.status = false
        test.error = err
        if (test.parent) test.parent.status = false
      }

      test.waiting = false
    }

    if (test.children) run(test.children)
  }, nodes)

  doneRunning()
}

function collectResults (nodes, level = 0) {
  traverseTree(test => {
    if (test.status) {
      test.log.unshift(`\u001b[31m${'♥'.padStart(level)}\u001b[0m ${test.description}`) // ✓
    } else {
      test.log.unshift('↓'.padStart(level) + ' ' + test.description) // ⚠
      if (test.error) log(test.error) // could be a child test who has the error
    }

    if (test.children) collectResults(test.children, level + 4)
  }, nodes)
}

function traverseTree (f, nodes) {
  each(node => {
    currentNode = node
    f(node)
  }, nodes)
}

function print (nodes, stringBuilder = []) {
  console.log(collectStrings(nodes, stringBuilder).join('\r\n'))
}

function collectStrings (nodes, stringBuilder) {
  if (nodes.length === 0) return stringBuilder

  const test = nodes[0]
  const tests = nodes.slice(1)

  stringBuilder.push(...test.log)
  if (test.children) {
    stringBuilder = collectStrings(test.children, stringBuilder)
  }

  if (tests.length !== 0) {
    stringBuilder = collectStrings(tests, stringBuilder)
  }

  return stringBuilder
}

export function describe (description, f) {
  addTest(tree, new TestNode(description, f))

  doRun()
}

export function it (description, f) {
  const test = new TestLeaf(description, f)
  test.parent = currentNode
  addTest(test.parent.children, test)

  doRun()
}

function addTest (node, test) {
  node.push(test)
}

export const log = (function log () {
  const messages = []

  function log (...msg) {
    if (currentNode) currentNode.log.push(msg.join(' '))
    else messages.push(msg.join(' '))
  }
  log.get = () => messages

  return log
}())
// export let log = (function (olog) {
//   const messages = []

//   keepMessages.flush = () => {
//     messages.forEach(x => {
//       Array.isArray(x) ? olog(...x) : olog(x)
//     })

//     keepMessages.clear()
//   }

//   keepMessages.top = (...msg) => {
//     messages.unshift(msg)
//   }

//   keepMessages.clear = () => {
//     messages.splice(0)
//   }

//   return keepMessages

//   function keepMessages (...msg) {
//     messages.push(msg)
//   }
// }(console.log))
