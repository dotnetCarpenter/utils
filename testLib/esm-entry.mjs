import child_process from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

export function start () {
  child_process.execFile(
    'node',
    [
      '--experimental-modules',
      '--experimental-json-modules',
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), './exec.js')
    ],
    console.error)
}
