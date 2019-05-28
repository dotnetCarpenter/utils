import log from './log'

/**
 * Set timeout 0 function.
 * @param {function} f The function to call on next tick
 * @param {...*} args Additional arguments to the supplied function
 * @returns {function} Calling this function will clear the timeout. If a {string} reason is given, then use log to print it.
 */
export default function onNextTick (f, ...args) {
  const timer = setTimeout(f, 0, ...args)
  /**
   * Clear timeout function
   * @param {string} reason Print reason to @see log if supplied
   */
  return reason => {
    clearTimeout(timer)
    if (reason != null) log(reason)
  }
}
