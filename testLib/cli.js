#!/usr/bin/env node

import('./esm-entry.mjs')
  .then(esmEntry => {
    esmEntry.start()
  })
  .catch(err => {
    if (String(err) === 'Error: Not supported') {
      require('./cjs-entry.cjs').start();
    } else {
      throw err;
    }
  })


// if (has(properExecArgv, process.execArgv)) {
//   console.log('--experimental-* flags detected.')
//   console.log('Please use exec.js instead.')
//   console.log(`E.g. node ${process.execArgv.join(' ')} testLib/exec.js`)
// } else {
//   const { execFile } = require('child_process')
//   const path = require('path')
//   execFile('node', properExecArgv.concat([path.resolve(__dirname, './exec.js')]), errorHandler)
// }

// function has (expected, actual) {
//   return expected.every(item => actual.indexOf(item) > -1)
// }

// function errorHandler (error) {
//   console.error(error)
// }
