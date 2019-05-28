/**
 * Compose functions.
 * @param  {...function} fs functions to call right to left, each return value is passed to the next function.
 */
export default function compose (...fs) { return initialValue => fs.reduceRight((x, f) => f(x), initialValue) }
