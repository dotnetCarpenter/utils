## List of `//@ts-check` bugs

## Extending object looses all original method definitions
Property 'ok' does not exist on type 'typeof assert'.ts(2339)

```js
import assert from 'assert'
assert.notOk = (expression, message) => {
  assert.ok(!expression, message)
}
export { assert }
```

```js
assert.ok(true)
```

### Description
`assert` is part of nodejs. Tests if value is truthy.

It is equivalent to `assert.equal(!!value, true, message)`.


## charCodeAt with default value
Expected 1 arguments, but got 0. _ts(2554)_

_lib.es5.d.ts (408, 16)_: An argument for 'index' was not provided.

```js
"Hello".charCodeAt() // -> 72
```

### Description
An integer greater than or equal to 0 and less than the length of the string; if it is not a number, it defaults to 0.

