#!/usr/bin/env node

import('./esm-entry.mjs')
  .then(esmEntry => {
    esmEntry.start()
  })
  .catch(err => {
    if (String(err) === 'Error: Not supported') {
      require('./cjs-entry.cjs').start()
    } else {
      throw err;
    }
  })
