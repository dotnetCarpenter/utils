//@ts-check

'use strict'

import ifElse from '../ifElse.js'
import partial from '../partial.js'
import { random } from './random.js'
import { rangeWith, randomChar } from './range.js'

// debug
import log from '../log.js'
import compose from '../compose.js'

const chance = () => random(1, 0) === 0
const between0And10 = partial(random, 10, 0)
const randomCharArray = () => rangeWith(randomChar, between0And10());
const nothing = () => void(0)
// const maybeItems = ifElse(chance, compose(log, randomCharArray), nothing)
const maybeItems = ifElse(chance, randomCharArray, nothing)

export default {
  items () {
    return maybeItems()
  },
  itemsForSure () {
    return randomCharArray()
  },
  nothing () {
    return nothing()
  },
}
