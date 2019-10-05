//@ts-check
'use strict'

import API from './stubAPI.js'
import map from '../map.js'

main()

/**
 * This program gets messages from an API which is quite
 * unstable. Some messages can not be printed and must be
 * discarded, while the same method might not return
 * anything at all.
 * We solve all of these misbehaves by utilizing functors.
 */
function main () {
  const message = API.items()
  console.log(message.join(), map(/** @param {string} char */ char => char.charCodeAt(0), message))
}
