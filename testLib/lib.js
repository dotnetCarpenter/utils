'use strict'

/*
  I use font symbols to mark successfull/unsuccessfull
  tests. But the default Windows terminal only support
  a few characters. See below for more info.
  Supported font symbols on Windows
  https://github.com/microsoft/terminal/issues/387
*/

import config from './testConfig.json'

import debounce from '../debounce.js'
import each from '../each.js'

import child_process from 'child_process'

import assert from 'assert'
assert.notOk = (expression, message) => {
  assert.ok(!expression, message)
}
export { assert }

const { runtimeArgs } = config

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

const doTest = debounce(() => { test(tree) }, TIMEOUT)
const doneRunning = debounce(() => {
  collectResults(tree)
// console.log(tree)
  print(tree, log.get())
  process.exit(exitCode)
}, TIMEOUT)

function test (nodes) {
  breadthFirst(testNode => {
    if (testNode.waiting) {

      try {
        testNode.f()
        testNode.status = true
      } catch (err) {
        exitCode = 1
        testNode.status = false
        testNode.error = err
        if (testNode.parent) testNode.parent.status = false
      }

      testNode.waiting = false
    }

    if (testNode.children) test(testNode.children)
  }, nodes)

  doneRunning()
}

function collectResults (nodes, level = 0) {
  const ident = ' '.repeat(level)

  breadthFirst(testNode => {
    if (testNode.status) {
      testNode.log.unshift(`\u001b[31m${ident}♥\u001b[0m ${testNode.description}`) // ✓
    } else {
      testNode.log.unshift(ident + '↓ ' + testNode.description) // ⚠
      if (testNode.error) { // test for error since it could be a child test who has the error
        log(`\u001b[31m${ident}${testNode.error.toString()}\u001b[0m`)
      }
    }

    if (testNode.children) collectResults(testNode.children, level + 4)
  }, nodes)
}

function breadthFirst (f, nodes) {
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

  doTest()
}

export function it (description, f) {
  const test = new TestLeaf(description, f)
  test.parent = currentNode
  addTest(test.parent.children, test)

  doTest()
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

export function run (testFile, stopSpecOnExpectationFailure = false) {
  const promise = new Promise((resolve, reject) => {
    child_process.execFile(
      'node',
      runtimeArgs.concat([testFile]), // append testFile to node flags
      (error, stdout, stderr) => {
        if (stopSpecOnExpectationFailure && error) {
          reject(stderr || stdout)
        } else {
          // always resolve if all test has to run
          resolve(stdout || stderr)
        }
      })
  })
  promise.catch(process.stderr.write.bind(process.stderr))

  return promise
}
