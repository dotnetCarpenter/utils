//@ts-check
'use strict'

import API from './stubAPI.js'
import map from '../map.js'
import { maybe, nothing } from '../functors.js'

const ILLEGAL_CHARS = []

main()

/**
 * This program gets messages from an API which is quite
 * unstable. Some messages can not be printed and must be
 * discarded, while the same method might not return
 * anything at all.
 * We solve all of these misbehaves by utilizing functors.
 */
function main () {
  let [fChars, fCharCodes] = withFunctor()
  console.log(fChars, fCharCodes)

  let [chars, charCodes] = withoutFunctor()
  console.log(chars, charCodes)
}

function withFunctor () {
  const message = maybe(API.items())

  if (message instanceof nothing) return ['API.items() returned nothing',]

  let chars
  message.fmap(/** @param {string[]} message */ message => {
    chars = message.join()
  })

  let charCodes
  message.fmap(/** @param {string[]} message */ message => {
    charCodes = map(char => char.charCodeAt(), message)
  })

  return [chars, charCodes]
}

function withoutFunctor () {
  const message = API.items()

  if (!message) return ['API.items() returned nothing',]

  let chars = message.join()
  let charCodes = map(char => char.charCodeAt(), message)
  // let charCodes = message.map(char => char.charCodeAt(0))

  return [chars, charCodes]
}
