#!/usr/bin/env node

const properExecArgv = ['--experimental-modules', '--experimental-json-modules']

if (has(properExecArgv, process.execArgv)) {
  Promise.all([
    import('child_process'),
    import('path'),
    import('url'),
  ])
  .then(modules => {
    const child_process = modules[0]
    const path = modules[1]
    const { fileURLToPath } = modules[2]

    child_process.execFile('node', properExecArgv.concat([path.resolve(path.dirname(fileURLToPath(import.meta.url)), './exec.js')]), errorHandler)
  })
  .catch(errorHandler)
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
