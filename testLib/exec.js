import os from 'os'
import path from 'path'
import fs from 'fs'
import { execFile } from 'child_process'
import { fileURLToPath } from 'url'
import config from './testConfig.json'
import filter from '../filter.js'
import map from '../map.js'
import identity from '../identity.js'
import partial from '../partial.js'

const CPU_COUNT = os.cpus().length
const testDir = config.spec_dir
const testFileMatchers = config.spec_files
const globToRegExp = glob => path.basename(glob).replace(/\./g, '\\.').replace(/\*/g, '.+')
const getFiles = filter(
  file => map(
    matcher => new RegExp(globToRegExp(matcher)).test(file),
    testFileMatchers).some(identity)
  )
const readTestDir = partial(fs.readdir,
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', testDir))

readTestDir((err, files) => {
  if (err) throw err

  const testFiles = getFiles(files)
  console.log(testFiles);
})
