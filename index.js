"use strict";

var presets = {
  basic: require('./lib/colors/basic'),
  roygbiv: require('./lib/colors/roygbiv'),
  html: require('./lib/colors/html')
}
var distance = require('euclidean-distance')
var chroma = require('chroma-js')
var color

module.exports = function(color, names) {

  if (!names)
    names = "basic"

  if (typeof(names) === "string")
    names = presets[names]

  if (!Array.isArray(names)) {
    throw new Error("Invalid names " + JSON.stringify(names))
  }

  color = chroma(color)

  return names
    .map (function(name) {
      name.distance = distance(color.lab(), chroma(name.hex).lab())
      return name
    })
    .sort (function(a, b) {
      return a.distance - b.distance
    })

}
