var fs = require('fs');

var Canvas = require('canvas');

var colors = require('./colors');

function Artwork(text, scale) {
  this.source = text;
  this.lines = text.split('\n');
  this.width = this.getWidth();
  this.height = this.getHeight();
  this.scale = scale | 1;
  this.canvas = new Canvas(this.width * this.scale, this.height * this.scale);
  this.ctx = this.canvas.getContext('2d');
}

Artwork.prototype.getWidth = function getWidth() {
  var l = 0;

  this.lines.forEach(function(p) {
    l = p.length > l ? p.length : l;
  });

  return l;
};

Artwork.prototype.getHeight = function getHeight() {
  return this.lines.length - 1;
};

Artwork.prototype.draw = function draw() {
  var self = this;

  this.lines.forEach(function(line, i) {
    var lineParts = line.replace('\n', '').split('');

    lineParts.forEach(function(col, j) {
      self.ctx.fillStyle = colors.hasOwnProperty(col) ? colors[col] : colors.default;
      console.log(self.ctx.fillStyle);
      self.ctx.fillRect(j * self.scale, i * self.scale, self.scale, self.scale);
    });

    if (lineParts.length < self.width) {
      var dif = self.width - lineParts.length;
      self.ctx.fillStyle = colors[' '] || colors.default;
      self.ctx.fillRect(lineParts.length * self.scale, i * self.scale, dif * self.scale, self.scale);
    }
  });
};

Artwork.prototype.write = function write(outFile) {
  var stream = this.canvas.pngStream();
  var outStream = fs.createWriteStream(outFile);

  stream.on('data', function(chunk) {
    outStream.write(chunk);
  });

  stream.on('end', function() {
    console.log('writing done');
  });
};

module.exports = Artwork;