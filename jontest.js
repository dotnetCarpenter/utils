import log from './log.js'
import map from './map.js'
import { just, nothing, fmap } from './functors.js'

import assert from 'assert'

let x2 = x => 2 * x
let getValue = x => +x

log( '+ is used to unbox a value from a functor' )
log( 'The getValue function is used to unbox a value from a list of functors', '\n' )

log( 'fmap (2*) [1,2,3,4] -> [2,4,6,8]' )
log( map(x2)([1,2,3,4]), '<- map(x2)([1,2,3,4])')
log( map(getValue, fmap(x2)([1,2,3,4]).join()), '<- map(getValue, fmap(x2)([1,2,3,4]).join())', '\n\n' )

// log( 'fmap (2*) (Just 1) -> Just 2' )
// log( fmap(x2, just(1)), '<- fmap(x2, just(1))' )
// log( +fmap(x2, just(1)), '<- +fmap(x2, just(1))', '\n\n' )

// // log( just(1).map(x2), '<- just(1).map(x2)' )
// // log( +(just(1).map(x2)), '<- +(just(1).map(x2))' )
// // log( +fmap(x2)(1), '<- +fmap(x2)(1)', '\n\n' )

// log( 'fmap (fmap (2*)) [Just 1, Just 2, Just 3, Nothing] -> [Just 2, Just 4, Just 6, Nothing]' )
// log( map(x2, [just(1), just(2), just(3), nothing()]), '<- map(x2, [just(1), just(2), just(3), nothing()])' )
// log( map( (fmap (x2)), [just(1), just(2), just(3), nothing()] ), '<- map( (fmap (x2)), [just(1), just(2), just(3), nothing()] )' )
// log( map( (fmap (x2)), [just(1), just(2), just(3), nothing()] ).map(getValue), '<- map( (fmap (x2)), [just(1), just(2), just(3), nothing()] ).map(getValue)' )
