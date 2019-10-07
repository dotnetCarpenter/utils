'use strict'

const CHAR = ''
// const CHAR_CODE = 60732
const CHAR_CODE = 60731
// const CHAR_CODE = 75

const { exec } = require('child_process');
exec(`echo ${String.fromCharCode(CHAR_CODE)}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.error(`stderr: ${stderr}`)

  const char = stdout.toString().trim()
  if (CHAR === char) {
    console.log("match")
  }
});

// const stdout = process.stdout
// function chunkReader (chunk) {
//   let s = chunk.toString()
//   setTimeout(()=>{console.log('data', s)}, 0)
//   // stdout.off('data', chunkReader)
//   // process.stdout.write(chunk.charCodeAt())
//   // if (CHAR_CODE === chunk.charCodeAt()) {
//   //   process.stdout.end(chunk.charCodeAt())
//   // }
// }
