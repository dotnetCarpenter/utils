//@ts-check
'use strict'

import os from 'os'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import config from './testConfig.json'
import { run } from './lib.js'
import filter from '../filter.js'
import map from '../map.js'
import identity from '../identity.js'
import partial from '../partial.js'
import compose from '../compose.js'
import curry from '../curry.js'
import each from '../each.js';

/*** @type {number} */
const CPU_COUNT = os.cpus().length - 1

const testDir = config.spec_dir

/** @type {boolean} */
const stopSpecOnExpectationFailure = config.stopSpecOnExpectationFailure

/** @type {string} */
const testFileMatchers = config.spec_files

/**
 * Poor man's glob to converter - really cheap bad fix for glob syntax
 * Does not do what you think
 * @param {string} glob
 * @returns {string}
 */
const globToRegExp = glob => path.basename(glob).replace(/\./g, '\\.').replace(/\*/g, '.+')

const filterFiles = filter(
  /** @param {string} file */
  file => map(
    /** @param {string} matcher */
    matcher => {
      // console.log('matcher', matcher)
      // console.log('globToRegExp(matcher)', globToRegExp(matcher))
      return new RegExp(globToRegExp(matcher)).test(file)
    },
    testFileMatchers).some(identity)
  )

/**
 * @param {string[]} relativeFilePaths
 */
const runConcurrent = (relativeFilePaths) => {
  const running = []
  const filePaths = []
  for (let c = 0, max = Math.min(CPU_COUNT, relativeFilePaths.length); c < max; c++) {
    const filePath = path.resolve(absoluteTestDirPath, relativeFilePaths[c])
    filePaths.push(filePath)
    running.push(run(filePath, stopSpecOnExpectationFailure))
  }

  // FIXME: Since lib.js write to console, which is the same shell
  // The output is duplicated - change lib.js to return strings, instead
  // of writing to stdout via console.log.
  // This is visible if "stopSpecOnExpectationFailure": true
  Promise.all(running)
    .then(
      /** @param {string[]} testOutputs */
      testOutputs => {
        const remainingFiles = relativeFilePaths.slice(CPU_COUNT)

        /**
         * @param {string} testOutput
         * @param {number} i
         */
        each((testOutput, i) => {
          console.log(filePaths[i], testOutput, '\r\n')
        }, testOutputs)

        if (remainingFiles.length) {
          runConcurrent(remainingFiles)
        }
      }
    )
    .catch(failedTestFile => {
      console.error(failedTestFile)
      process.exit(1)
    })
}

/*** @type {function} */
const throwOrExecute = curry(
  /**
   * @param {(arg0: any) => void} f
   * @param {any} err
   * @param {any} arg
   */
  (f, err, arg) => {
    if (err) throw err
    return f(arg)
  }
)

/*** @type {function} */
const thenRunTests = throwOrExecute(compose(runConcurrent, filterFiles))

/*** @type {string} */
const absoluteTestDirPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', testDir)

/*** @type {function} */
const readTestDir = partial(fs.readdir, absoluteTestDirPath)

readTestDir(thenRunTests)
