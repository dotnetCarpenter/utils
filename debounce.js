export default function debounce (f, delay) {
  let timer
  return (...xs) => {
    if (timer) clearTimeout(timer)

    timer = setTimeout(f, delay, ...xs)
  }
}
