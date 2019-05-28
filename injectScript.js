function injectScript (url, doc = document) {
  return new Promise((resolve, reject) => {
    const head = doc.head
    const s = doc.createElement('script')
    s.type = 'text/javascript'
    s.crossorigin = 'anonymous'
    s.async = s.defer = true
    s.src = url
    s.addEventListener('load', function () {
      s.removeEventListener('load', this)
      s.removeEventListener('error', errorHandler)
      resolve()
    })
    s.addEventListener('error', errorHandler)
    head.appendChild(s)

    function errorHandler (err) {
      s.removeEventListener('error', this)
      reject(err)
    }
  })
}

export default injectScript
