import d3_array from 'd3-array'
import d3_dispatch from 'd3-dispatch'
import d3_scale from 'd3-scale'
import d3_selection from 'd3-selection'
import functor from './functor'

export default function scatter () {

  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var getValues      = data => data.values,
      getX           = point => point.x,
      getY           = point => point.y,
      getSize        = point => point.size || 1,
      getColor       = point => point.color || 0,
      x              = d3_scale.scaleLinear(),
      y              = d3_scale.scaleLinear(),
      size           = d3_scale.scaleLinear(),
      color          = d3_scale.scaleCategory10(),
      sizeRange      = [5, 20],
      height         = 400,
      width          = 600,
      dispatch       = d3_dispatch.dispatch('elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')

  //------------------------------------------------------------

  function chart(selection) {
    selection.each(function(data) {
      var container = d3_selection.select(this)

      //------------------------------------------------------------
      // Setup Chart Scales and Data Layout Calculations

      x
        .domain(d3_array.extent(getValues(data), getX))
        .range([0, width])

      y
        .domain(d3_array.extent(getValues(data), getY))
        .range([height, 0])

      size
        .domain(d3_array.extent(getValues(data), getSize))
        .range(sizeRange)

      color
        .domain(d3_array.extent(getValues(data), getColor))

      //------------------------------------------------------------

      //------------------------------------------------------------
      // Setup Chart Layers

      var wrap      = container.selectAll('g.d3-scatter').data([data])
      var wrapEnter = wrap.enter().append('g').attr('class', 'd3-scatter')

      wrapEnter.append('g').attr('class', 'd3-chart-points')

      //------------------------------------------------------------

      var points = container.select('.d3-chart-points').selectAll('.d3-chart-point')
          .data(getValues)

      points.enter().append('circle')
          .attr('class', 'd3-chart-point')
        .merge(points)
          .attr('r', (d, i) => size(getSize(d, i)))
          .attr('cx', (d, i) => x(getX(d, i)))
          .attr('cy', (d, i) => y(getY(d, i)))
          .style('fill', (d, i) => color(getColor(d, i)))
          .style('stroke', (d, i) => color(getColor(d, i)))
          .on('click', function() { dispatch.apply('elementClick', this, arguments) })
          .on('dblclick', function() { dispatch.apply('elementDblClick', this, arguments) })
          .on('mouseover', function() { dispatch.apply('elementMouseover', this, arguments) })
          .on('mouseout', function() { dispatch.apply('elementMouseout', this, arguments) })

      points.exit().remove()

    })
  }

  //============================================================
  // Expose Public API
  //------------------------------------------------------------

  chart.values = function(_) {
    if (!arguments.length) return getValues
    getValues = functor(_)
    return chart
  }

  chart.x = function(_) {
    if (!arguments.length) return getX
    getX = functor(_)
    return chart
  }

  chart.y = function(_) {
    if (!arguments.length) return getY
    getY = functor(_)
    return chart
  }

  chart.size = function(_) {
    if (!arguments.length) return getSize
    getSize = functor(_)
    return chart
  }

  chart.color = function(_) {
    if (!arguments.length) return getColor
    getColor = functor(_)
    return chart
  }

  chart.scaleX = function(_) {
    if (!arguments.length) return x
    x = _
    return chart
  }

  chart.scaleY = function(_) {
    if (!arguments.length) return y
    y = _
    return chart
  }

  chart.scaleSize = function(_) {
    if (!arguments.length) return size
    size = _
    return chart
  }

  chart.scaleColor = function(_) {
    if (!arguments.length) return color
    color = _
    return chart
  }
  chart.sizeRange = function(_) {
    if (!arguments.length) return sizeRange
    sizeRange = _
    return chart
  }

  chart.height = function(_) {
    if (!arguments.length) return height
    height = _
    return chart
  }

  chart.width = function(_) {
    if (!arguments.length) return width
    width = _
    return chart
  }

  chart.dispatch = function(_) {
    if (!arguments.length) return dispatch
    dispatch = _
    return chart
  }

  //------------------------------------------------------------

  return chart
}

