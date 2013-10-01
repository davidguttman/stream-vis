var through = require('through')

module.exports = function(stream, opts) {
  var vis = new Vis(opts)

  stream.on('data', function(data) {
    vis.onData(data)
  })

  return vis
}

function Vis (opts) {
  var self = this

  opts = opts || {}
  opts.x = opts.x || 100
  opts.y = opts.y || 100
  opts.w = opts.w || 50
  opts.h = opts.h || 50
  
  opts.r = opts.r || 0
  opts.g = opts.g || 100
  opts.b = opts.b || 100
  opts.a = opts.a || 1

  opts.bufferVisible = opts.bufferVisible || false

  extend(this, opts)

  this.recentData = []
  this.el = this.createElement()
  this.bufferEl = this.createBufferElement()
  this.el.appendChild(this.bufferEl)

  this.el.addEventListener('click', function() {
    self.toggleBufferDisplay()
  })

  this.el.addEventListener('mouseenter', function() {
    self.showBuffer()
  })

  this.el.addEventListener('mouseleave', function() {
    if (!self.bufferVisible) {
      self.hideBuffer()
    };
  })

  return this
}

Vis.prototype.createElement = function() {
  var elem = document.createElement('div')
  var color = 'rgba('+[this.r,this.g,this.b,this.a].join(',')+')'
  var style = {
      position: 'absolute'
    , left: this.x - this.w/2 + 'px'
    , top: this.y - this.h/2 + 'px'
    , width: this.w + 'px'
    , height: this.h*3/4 + 'px'
    , background: color
    , borderRadius: this.w/4 + 'px'
    , paddingTop: this.h/4 + 'px'
    , textAlign: 'center'
    , fontFamily: 'helvetica'
  }

  extend(elem.style, style)

  return elem
}

Vis.prototype.createBufferElement = function() {
  var elem = document.createElement('div')
  
  var style = {
      position: 'absolute'
    , top: this.h + 10 + 'px'
    , background: 'white'
    , borderRadius: 20 + 'px'
    , fontFamily: 'helvetica'
    , textAlign: 'left'
    , fontSize: '50%'
    , color: 'rgba(0,0,0,0.5)'
    , display: 'none'
  }

  if (this.bufferVisible) {
    style.display = 'block'
  };

  extend(elem.style, style)

  return elem
}

Vis.prototype.flash = function(data) {
  var flashDuration = 100
  var refracDuration = 25
  this.isFlashing = true

  var self = this
  var el = this.el

  var c = {
      r: 200
    , g: 200
    , b: 50
    , a: this.a
  }

  var flashColor = 'rgba('+[c.r,c.g,c.b,c.a].join(',')+')'
  var normalColor = 'rgba('+[this.r,this.g,this.b,this.a].join(',')+')'

  this.el.style.background = flashColor
  
  setTimeout(function() {
    el.style.background = normalColor
  }, flashDuration)

  setTimeout(function() {
    self.isFlashing = false
  }, flashDuration + refracDuration)
};

Vis.prototype.onData = function(data) {
  this.addData(data)

  var bufferText = this.recentData.map(function(data) {
    return JSON.stringify(data)
  }).join('<br />')

  this.bufferEl.innerHTML = bufferText

  if (this.isFlashing) {

  } else {
    this.flash(data)
  }
}

Vis.prototype.addData = function(data) {
  var maxLength = 10
  this.recentData.push(data)
  while (this.recentData.length > maxLength) {
    this.recentData.shift()
  }
}

Vis.prototype.showBuffer = function() {
  this.bufferEl.style.display = 'block'
};

Vis.prototype.hideBuffer = function() {
  this.bufferEl.style.display = 'none'
};

Vis.prototype.toggleBufferDisplay = function() {
  if (!this.bufferVisible) {
    this.bufferVisible = true
    this.showBuffer()
    return true
  } else {
    this.bufferVisible = false
    this.hideBuffer()
    return false
  }
};

function extend (to, from) {
  for (var key in from) { to[key] = from[key] }
  return to
}