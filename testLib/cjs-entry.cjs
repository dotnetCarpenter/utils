'use strict'

const { execFile } = require('child_process')
const path = require('path')
const { runtimeArgs } = require('./testConfig.json')

// append exec.js to node flags
runtimeArgs.push(path.resolve(__dirname, './exec.js'))

module.exports.start = function start () {
  execFile(
    'node',
    runtimeArgs,
    console.error)
}