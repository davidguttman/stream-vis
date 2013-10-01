var through = require('through')

module.exports = function createMouseStream () {
  var stream = through()
  document.addEventListener('mousemove', function(evt) {
  
    var data = {
      x: evt.clientX / window.innerWidth,
      y: evt.clientY / window.innerHeight
    }

    stream.emit('data', data)
  })
  return stream
}