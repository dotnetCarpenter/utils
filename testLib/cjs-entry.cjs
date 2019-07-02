'use strict'

const { execFile } = require('child_process')
const path = require('path')

module.exports.start = function start () {
  execFile(
    'node',
    [
      '--experimental-modules',
      '--experimental-json-modules',
      path.resolve(__dirname, './exec.js')],
    console.error)
}