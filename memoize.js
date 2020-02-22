export default function memoize (f) {
  const cache = new Map()
  return argument => {
    let hit = cache.get(argument)

    if (hit === undefined) {
      hit = f(argument)
      cache.set(argument, hit)
    }

    return hit
  }
}
