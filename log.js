//@ts-check
'use strict'

const appStartTime = Date.now()
/**
 * console.log function that returns the first parameter
 * and adds a timestamp in front of the messages to print.
 * @param  {...any} msgs
 * @returns {any} The first parameter passed to log.
 */
export default function log (...msgs) {
  // KLUDGE: the .toString() is because chrome devtools makes number and string
  // mixed in a console.log look super weird.
  msgs.unshift( (Date.now() - appStartTime).toString() )
  console.log(...msgs)
  return msgs[1]
}
