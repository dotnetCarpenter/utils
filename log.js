const appStartTime = Date.now()
export default function log (...msgs) {
  // KLUDGE: the .toString() is because chrome devtools makes number and string
  // mixed in a console.log look super weird.
  msgs.unshift( (Date.now() - appStartTime).toString() )
  console.log(...msgs)
  return msgs[0]
}
