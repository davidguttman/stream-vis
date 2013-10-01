var MouseStream = require('./mouse-stream')
var Vis = require('../')

var stream = MouseStream()

var w = window.innerWidth/4,
    h = window.innerHeight/4,
    x = window.innerWidth/2 - w/2,
    y = window.innerHeight/2 - h/2

var vis = Vis({x:x,y:y,w:w,h:h})
stream.pipe(vis)
document.body.appendChild(vis.el)