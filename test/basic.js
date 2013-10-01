var test = require('tape')
var streamVis = require('../')
var through = require('through')

test('basic', function(t) {
  t.plan(1)
  var stream = through()
  var vis = streamVis(stream)

  stream.emit('data', 'hi')

  t.equal(vis.bufferEl.innerHTML, '"hi"')
})