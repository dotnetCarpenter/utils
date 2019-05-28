'use strict'

import filter from './filter'
import each from './each'

function Observer () {
  let listeners = []

  return {
    on (name, f) {
      listeners.push([name, f])
    },
    off (name, f) {
      listeners = filter(listener => {
        if (name === listener[0]) {
          return f ? f !== listener[1] : false
        }
        return true
      }, listeners)
    },
    fire (name, ...args) {
      each(listener => {
        if (name === listener[0]) listener[1](...args)
      }, listeners)
    },
    clearAllListeners () {
      listeners = null
    }
  }
}

export default Observer
