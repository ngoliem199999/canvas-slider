(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CanvasViewport, axisFitOnCanvas;

CanvasViewport = (function() {
  function CanvasViewport(node, images) {
    this.node = node;
    this.images = images;
    this.context = this.node.getContext('2d');
  }

  CanvasViewport.prototype.render = function(x) {
    x = Math.max(0, Math.min(x, this.node.width * (this.images.length - 1)));
    this.context.fillStyle = 'pink';
    this.context.fillRect(0, 0, this.node.width, this.node.height);
    return this.images.forEach((function(_this) {
      return function(image) {
        return _this._drawImage(image.node, image.x - x, image.y);
      };
    })(this));
  };

  CanvasViewport.prototype._drawImage = function(image, x, y) {
    var height, ref, ref1, sx, sy, width;
    ref = axisFitOnCanvas(x, image.width, this.node.width), x = ref[0], width = ref[1], sx = ref[2];
    ref1 = axisFitOnCanvas(y, image.height, this.node.height), y = ref1[0], height = ref1[1], sy = ref1[2];
    if (width === 0 || height === 0) {
      return;
    }
    this.context.drawImage(image, sx, sy, width, height, x, y, width, height);
  };

  return CanvasViewport;

})();

axisFitOnCanvas = function(position, size, available) {
  var overdue, sourcePosition;
  sourcePosition = 0;
  if (position + size < 0) {
    size = 0;
  } else if (position < 0) {
    overdue = 0 - position;
    size -= overdue;
    sourcePosition += overdue;
    position = 0;
  } else if (position > available) {
    size = 0;
  } else if (position + size > available) {
    size = available - position;
  }
  return [position, size, sourcePosition];
};

module.exports = CanvasViewport;



},{}],2:[function(require,module,exports){
var CanvasViewport, canvasSlider, centered;

CanvasViewport = require('./CanvasViewport');

canvasSlider = window.canvasSlider || {};

canvasSlider.createFrom = function(node) {
  var images;
  images = Array.prototype.map.call(node.children, function(image, index) {
    return {
      node: image,
      x: (index * node.width) + centered(image.width, node.width),
      y: centered(image.height, node.height)
    };
  });
  return new CanvasViewport(node, images);
};

window.canvasSlider = canvasSlider;

centered = function(size, available) {
  var short;
  short = available - size;
  if (short <= 0) {
    return 0;
  }
  return Math.floor(short / 2);
};



},{"./CanvasViewport":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9jaHJpc3RpYWFuL3RtcC9jYW52YXMtc2xpZGVyL3NyYy9DYW52YXNWaWV3cG9ydC5jb2ZmZWUiLCIvaG9tZS9jaHJpc3RpYWFuL3RtcC9jYW52YXMtc2xpZGVyL3NyYy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLCtCQUFBOztBQUFBO0FBQ2UsRUFBQSx3QkFBQyxJQUFELEVBQVEsTUFBUixHQUFBO0FBQ1gsSUFEWSxJQUFDLENBQUEsT0FBRCxJQUNaLENBQUE7QUFBQSxJQURtQixJQUFDLENBQUEsU0FBRCxNQUNuQixDQUFBO0FBQUEsSUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxJQUFJLENBQUMsVUFBTixDQUFpQixJQUFqQixDQUFYLENBRFc7RUFBQSxDQUFiOztBQUFBLDJCQUdBLE1BQUEsR0FBUSxTQUFDLENBQUQsR0FBQTtBQUNOLElBQUEsQ0FBQSxHQUFJLElBQUksQ0FBQyxHQUFMLENBQVMsQ0FBVCxFQUFZLElBQUksQ0FBQyxHQUFMLENBQVMsQ0FBVCxFQUFZLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBTixHQUFjLENBQUMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFSLEdBQWlCLENBQWxCLENBQTFCLENBQVosQ0FBSixDQUFBO0FBQUEsSUFDQSxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVQsR0FBcUIsTUFEckIsQ0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUFULENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBOUIsRUFBcUMsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUEzQyxDQUZBLENBQUE7V0FHQSxJQUFDLENBQUEsTUFBTSxDQUFDLE9BQVIsQ0FBZ0IsQ0FBQSxTQUFBLEtBQUEsR0FB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UUFBQSxDQUFTLEtBQUssQ0FBQyxNQUFmLEVBQXVCLElBQUksQ0FBQyxNQUE1QixDQUhMO01BRCtDO0VBQUEsQ0FBeEMsQ0FBVCxDQUFBO0FBUUEsU0FBVyxJQUFBLGNBQUEsQ0FBZSxJQUFmLEVBQXFCLE1BQXJCLENBQVgsQ0FWd0I7QUFBQSxDQUoxQixDQUFBOztBQUFBLE1BZ0JNLENBQUMsWUFBUCxHQUFzQixZQWhCdEIsQ0FBQTs7QUFBQSxRQWtCQSxHQUFXLFNBQUMsSUFBRCxFQUFPLFNBQVAsR0FBQTtBQUNULE1BQUEsS0FBQTtBQUFBLEVBQUEsS0FBQSxHQUFRLFNBQUEsR0FBWSxJQUFwQixDQUFBO0FBQ0EsRUFBQSxJQUFZLEtBQUEsSUFBUyxDQUFyQjtBQUFBLFdBQU8sQ0FBUCxDQUFBO0dBREE7QUFHQSxTQUFPLElBQUksQ0FBQyxLQUFMLENBQVcsS0FBQSxHQUFRLENBQW5CLENBQVAsQ0FKUztBQUFBLENBbEJYLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgQ2FudmFzVmlld3BvcnRcbiAgY29uc3RydWN0b3I6IChAbm9kZSwgQGltYWdlcyktPlxuICAgIEBjb250ZXh0ID0gQG5vZGUuZ2V0Q29udGV4dCAnMmQnXG5cbiAgcmVuZGVyOiAoeCktPlxuICAgIHggPSBNYXRoLm1heCAwLCBNYXRoLm1pbiB4LCBAbm9kZS53aWR0aCAqIChAaW1hZ2VzLmxlbmd0aCAtIDEpXG4gICAgQGNvbnRleHQuZmlsbFN0eWxlID0gJ3BpbmsnXG4gICAgQGNvbnRleHQuZmlsbFJlY3QgMCwgMCwgQG5vZGUud2lkdGgsIEBub2RlLmhlaWdodFxuICAgIEBpbWFnZXMuZm9yRWFjaCAoaW1hZ2UpPT5cbiAgICAgIEBfZHJhd0ltYWdlIGltYWdlLm5vZGUsIGltYWdlLnggLSB4LCBpbWFnZS55XG5cblxuICBfZHJhd0ltYWdlOiAoaW1hZ2UsIHgsIHkpLT5cbiAgICBbeCwgd2lkdGgsIHN4XSA9IGF4aXNGaXRPbkNhbnZhcyh4LCBpbWFnZS53aWR0aCwgQG5vZGUud2lkdGgpXG4gICAgW3ksIGhlaWdodCwgc3ldID0gYXhpc0ZpdE9uQ2FudmFzKHksIGltYWdlLmhlaWdodCwgQG5vZGUuaGVpZ2h0KVxuICAgIHJldHVybiBpZiB3aWR0aCA9PSAwIG9yIGhlaWdodCA9PSAwXG5cbiAgICAjIGRyYXdJbWFnZShpbWFnZSwgc3gsIHN5LCBzV2lkdGgsIHNIZWlnaHQsIGR4LCBkeSwgZFdpZHRoLCBkSGVpZ2h0KVxuICAgIEBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgc3gsIHN5LCB3aWR0aCwgaGVpZ2h0LCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICByZXR1cm5cblxuXG5heGlzRml0T25DYW52YXMgPSAocG9zaXRpb24sIHNpemUsIGF2YWlsYWJsZSktPlxuICBzb3VyY2VQb3NpdGlvbiA9IDBcbiAgaWYgcG9zaXRpb24gKyBzaXplIDwgMFxuICAgIHNpemUgPSAwXG4gIGVsc2UgaWYgcG9zaXRpb24gPCAwXG4gICAgb3ZlcmR1ZSA9IDAgLSBwb3NpdGlvblxuICAgIHNpemUgLT0gb3ZlcmR1ZVxuICAgIHNvdXJjZVBvc2l0aW9uICs9IG92ZXJkdWVcbiAgICBwb3NpdGlvbiA9IDBcbiAgZWxzZSBpZiBwb3NpdGlvbiA+IGF2YWlsYWJsZVxuICAgIHNpemUgPSAwXG4gIGVsc2UgaWYgcG9zaXRpb24gKyBzaXplID4gYXZhaWxhYmxlXG4gICAgc2l6ZSA9IGF2YWlsYWJsZSAtIHBvc2l0aW9uXG5cbiAgW3Bvc2l0aW9uLCBzaXplLCBzb3VyY2VQb3NpdGlvbl1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IENhbnZhc1ZpZXdwb3J0XG4iLCJDYW52YXNWaWV3cG9ydCA9IHJlcXVpcmUgJy4vQ2FudmFzVmlld3BvcnQnXG5cbmNhbnZhc1NsaWRlciA9IHdpbmRvdy5jYW52YXNTbGlkZXIgfHwge31cblxuY2FudmFzU2xpZGVyLmNyZWF0ZUZyb20gPSAobm9kZSkgLT5cblxuICBpbWFnZXMgPSBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwobm9kZS5jaGlsZHJlbiwgKGltYWdlLCBpbmRleCktPlxuICAgIHtcbiAgICAgIG5vZGU6IGltYWdlLFxuICAgICAgeDogKGluZGV4ICogbm9kZS53aWR0aCkgKyBjZW50ZXJlZChpbWFnZS53aWR0aCwgbm9kZS53aWR0aCksXG4gICAgICB5OiBjZW50ZXJlZChpbWFnZS5oZWlnaHQsIG5vZGUuaGVpZ2h0KVxuICAgIH1cbiAgKVxuXG4gIHJldHVybiBuZXcgQ2FudmFzVmlld3BvcnQobm9kZSwgaW1hZ2VzKVxuXG53aW5kb3cuY2FudmFzU2xpZGVyID0gY2FudmFzU2xpZGVyXG5cbmNlbnRlcmVkID0gKHNpemUsIGF2YWlsYWJsZSktPlxuICBzaG9ydCA9IGF2YWlsYWJsZSAtIHNpemVcbiAgcmV0dXJuIDAgaWYgc2hvcnQgPD0gMFxuXG4gIHJldHVybiBNYXRoLmZsb29yKHNob3J0IC8gMilcbiJdfQ==
