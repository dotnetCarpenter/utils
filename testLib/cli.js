#!/usr/bin/env node

const properExecArgv = ['--experimental-modules', '--experimental-json-modules']

if (has(properExecArgv, process.execArgv)) {
  console.log('--experimental-* flags detected.')
  console.log('Please use exec.js instead.')
  console.log(`E.g. node ${process.execArgv.join(' ')} testLib/exec.js`)
} else {
  const { execFile } = require('child_process')
  const path = require('path')
  execFile('node', properExecArgv.concat([path.resolve(__dirname, './exec.js')]), errorHandler)
}

function has (expected, actual) {
  return expected.every(item => actual.indexOf(item) > -1)
}

function errorHandler (error) {
  console.error(error)
}
