var MouseStream = require('./mouse-stream')
var streamVis = require('../')

var stream = MouseStream()

var w = window.innerWidth/2,
    h = window.innerHeight/4,
    x = window.innerWidth/2,
    y = window.innerHeight/2

var vis = streamVis(stream, {x:x,y:y,w:w,h:h})
document.body.appendChild(vis.el)