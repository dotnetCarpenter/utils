`instanceof` checks constructor.

```js
function functor () {}
function maybe () {}
function just () {}
->
	just.__proto__ = Function
	just.prototype = {
		constructor: just,
		__proto__: Object
	}

JustKind = Object.create(just.prototype)
->
	JustKind.prototype = undefined
	JustKind.__proto__ = {
		constructor: just,
		__proto__: Object
	}

Object.setPrototypeOf(JustKind.__proto__, Object.create(maybe.prototype))
->
	JustKind.prototype = undefined
	JustKind.__proto__ = maybe {
		constructor: just,
		__proto__: maybe {
			constructor: undefined
			__proto__: Object
		}
	}

Object.setPrototypeOf(JustKind.__proto__.__proto__, Object.create(functor.prototype))
->
	JustKind.prototype = undefined
	JustKind.__proto__ = functor {
		constructor: just,
		__proto__: functor {
			__proto__: functor {
				__proto: Object
			}
		}
	}

Object.create(JustKind)
->
	prototype = undefined
	__proto__: just {
		__proto__: functor
	}
```

```js
const JustKind = Object.create(just.prototype, {
	fmap: { value(f) { return just(f(v)) } },
	valueOf: { value() { return v } }
})
Object.setPrototypeOf(JustKind.__proto__, maybe.prototype)
Object.setPrototypeOf(JustKind.__proto__.__proto__, functor.prototype)

JustKind.prototype = undefined
JustKind.__proto__ = { <maybe> {
	constructor: function just {
		name: 'just'
		prototype: <maybe> {
			constructor: function just {
				name: 'just',
				prototype: <maybe> {
					constructor: function just{},
					prototype: <maybe> {
						constructor: function just,
						__proto__: <functor>
					},
					__proto__: <functor> {
						constructor: function maybe {
							name: 'maybe',
							prototype: <functor> {
								constructor: function maybe {
									name: 'maybe',
									prototype: <functor> {
										constructor: function maybe {
											name: 'maybe',
											prototype: <functor> {
												constructor: function maybe {
													name: 'maybe',
													prototype:<functor> {etc...}
												},
												__proto__: Object
											},
											__proto__: Function
										},
										__proto__: Object {
											constructor: function functor,
											__proto__: Object
										}
									}
								},
								__proto__: Object {
									constructor: function functor,
									__proto__: Object
								}
							},
							__proto__: Function
						},
						__proto__: Object {
							constructor: function functor,
							__proto__: Object
						}
					}
				},
				__proto__: Function
			},
			__proto__: <functor> {
				constructor: {
					name: 'just',
					prototype: <maybe> {

					},
					__proto__: Function
				},
				__proto__:
			}
		},
		__proto__: Function,
	},
	__proto__: <functor> {
		constructor: function maybe {
			name: 'maybe',
			prototype: <functor> {
				constructor: constructor: function maybe {
					name: 'maybe',
					prototype: <functor> {
						constructor: function maybe,
						__proto__: <Object> {
							constructor: function functor,
							__proto__: Object
						}
					},
					__proto__: Function
				},
				__proto__: <Object> {
					constructor: function maybe,
				}
			},
			__proto__: <Function> {
				constructor: function maybe {
					name: 'maybe',
					prototype: <functor> {
						constructor: function maybe,
						__proto__: <Object> {
							constructor: function functor,
							__proto__: Object
						}
					},
					__proto__: Function
				},
				__proto__: <Object> {
					constructor: function functor,
					__proto__: Object
				}
			}
		},
		__proto__: <Object> {
			constructor: function functor,
			__proto__: Object
		}
	}
}
```