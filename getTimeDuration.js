/**
 * First call starts a timer and returns a function
 * that when called will give the elapsed time in
 * milisecond, while subtracting "hidden" time.
 * @returns {function} Calling this function will return the elapsed time.
 */
export default function getTimeDuration () {
  const startTimestamp = Date.now()
  let hiddenTimeDelta = 0
  let hiddenTimeStart = 0

  trackHiddenTime() // manually call in case the page is rendered hidden
  document.addEventListener('visibilitychange', trackHiddenTime)

  function trackHiddenTime () {
    if (document.hidden) {
      hiddenTimeStart = Date.now()
    } else if (hiddenTimeStart > 0) {
      hiddenTimeDelta += (Date.now() - hiddenTimeStart)
    }
  }

  /**
   * @returns {Number} Total elapsed time since `getTimeDuration()`.
   */
  return () => {
    document.removeEventListener('visibilitychange', trackHiddenTime)

    return (Date.now() - hiddenTimeDelta) - startTimestamp
  }
}
