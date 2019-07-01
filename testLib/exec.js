import os from 'os'
import path from 'path'
import fs from 'fs'
import { execFile } from 'child_process'
import config from './testConfig.json'
import filter from '../filter.js'
import map from '../map.js'
import identity from '../identity.js';

const CPU_COUNT = os.cpus().length
const testDir = config.spec_dir
const testFileMatchers = config.spec_files
const getFiles = filter(
  file => map(
    matcher => new RegExp(path.basename(matcher)).test(file),
    testFileMatchers).some(identity)
  )

fs.readdir(
  path.resolve('..', testDir),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err

    const testFiles = getFiles(files)
    ;
  })
