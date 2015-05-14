CanvasViewport = require './CanvasViewport'

canvasSlider = window.canvasSlider || {}

canvasSlider.createFrom = (node) ->

  images = Array.prototype.map.call(node.children, (image, index)->
    {
      node: image,
      x: (index * node.width) + centered(image.width, node.width),
      y: centered(image.height, node.height)
    }
  )

  return new CanvasViewport(node, images)

window.canvasSlider = canvasSlider

centered = (size, available)->
  short = available - size
  return 0 if short <= 0

  return Math.floor(short / 2)
