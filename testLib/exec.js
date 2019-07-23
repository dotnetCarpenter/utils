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
const CPU_COUNT = os.cpus().length
const testDir = config.spec_dir

/** @type {string} */
const testFileMatchers = config.spec_files
const globToRegExp = glob => path.basename(glob).replace(/\./g, '\\.').replace(/\*/g, '.+')
const filterFiles = filter(
  file => map(
    matcher => new RegExp(globToRegExp(matcher)).test(file),
    testFileMatchers).some(identity)
  )

const runConcurrent = (files) => {
  const running = []
  const filePaths = []
  for (let c = 0, max = Math.min(CPU_COUNT, files.length); c < max; c++) {
    const filePath = path.resolve(absoluteTestDirPath, files[c])
    filePaths.push(filePath)
    running.push(run(filePath))
  }

  Promise.all(running)
    .then(tests => {
      const remainingFiles = files.slice(CPU_COUNT)
      each((testOutput, i)=> {
        console.log(
          `${filePaths[i]}:
          ${testOutput}`
        )
      }, tests)
      if (remainingFiles.length) {
        runConcurrent(remainingFiles)
      }
    })
}
/*** @type {function} */
const throwOrExecute = curry((f, err, arg) => {
  if (err) throw err
  return f(arg)
})
/*** @type {function} */
const thenRunTests = throwOrExecute(compose(runConcurrent, filterFiles))
/*** @type {string} */
const absoluteTestDirPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', testDir)
/*** @type {function} */
const readTestDir = partial(fs.readdir, absoluteTestDirPath)

readTestDir(thenRunTests)
