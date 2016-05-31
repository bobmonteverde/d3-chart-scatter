import d3_array from 'd3-array'
import d3_chart_xybase from 'd3-chart-xybase'
import d3_dispatch from 'd3-dispatch'
import d3_scale from 'd3-scale'
import d3_selection from 'd3-selection'

function functor (f) {
  return typeof f === 'function' ? f : function() { return f }
}

// Copies a variable number of methods from source to target.
function rebind (target, source) {
  var i = 1, n = arguments.length, method
  while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method])
  return target
}

// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
function d3_rebind (target, source, method) {
  return function() {
    var value = method.apply(source, arguments)
    return value === source ? target : value
  }
}

export default function chart_scatter () {

  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var chartBase      = d3_chart_xybase.chart_xybase(),
      getValues      = data => data.values,
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
      margin         = { top: 20, right: 20, bottom: 30, left: 40 },
      dispatch       = d3_dispatch.dispatch('elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout')

  chartBase
    .scaleBottom(x)
    .scaleTop(x)
    .scaleLeft(y)
    .scaleRight(y)

  //------------------------------------------------------------

  function chart(selection) {
    selection.each(function(data) {
      var availableHeight = height - margin.top - margin.bottom,
          availableWidth = width - margin.left - margin.right,
          container = d3_selection.select(this)

      if (availableHeight < 0) availableHeight = 0
      if (availableWidth < 0)  availableWidth = 0

      chartBase
        .margin(margin)
        .width(width)
        .height(height)

      //------------------------------------------------------------
      // Setup Chart Scales and Data Layout Calculations

      x
        .domain(d3_array.extent(getValues(data), getX))
        .range([0, availableWidth])

      y
        .domain(d3_array.extent(getValues(data), getY))
        .range([availableHeight, 0])

      size
        .domain(d3_array.extent(getValues(data), getSize))
        .range(sizeRange)

      color
        .domain(d3_array.extent(getValues(data), getColor))

      //------------------------------------------------------------

      //------------------------------------------------------------
      // Setup Chart Layers

      var wrap      = container.selectAll('g.d3-chart-scatter').data([data])
      var wrapEnter = wrap.enter().append('g').attr('class', 'd3-chart-scatter')
      var gEnter    = wrapEnter.append('g')
      var g         = container.select('.d3-chart-scatter g')

      wrapEnter.append('g').attr('class', 'd3-chart-base')
      gEnter.append('g').attr('class', 'd3-chart-points')

      g.attr('transform', `translate(${margin.left},${margin.top})`)

      //------------------------------------------------------------

      container.select('.d3-chart-base')
          .call(chartBase)

      var points = g.select('.d3-chart-points').selectAll('.d3-chart-point')
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

  rebind(chart, chartBase, 'renderAxisBottom', 'renderAxisTop', 'renderAxisLeft', 'renderAxisRight', 'labelBottom', 'labelTop', 'labelLeft', 'labelRight', 'labelPosBottom', 'labelPosTop', 'labelPosLeft', 'labelPosRight')

  chart.chartBase = function(_) {
    if (!arguments.length) return chartBase
    chartBase = _
    return chart
  }

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
    if (!arguments.length) return scaleX
    scaleX = _
    return chart
  }

  chart.scaleY = function(_) {
    if (!arguments.length) return scaleY
    scaleY = _
    return chart
  }

  chart.scaleSize = function(_) {
    if (!arguments.length) return scaleSize
    scaleSize = _
    return chart
  }

  chart.scaleColor = function(_) {
    if (!arguments.length) return scaleColor
    scaleColor = _
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

  chart.margin = function(_) {
    if (!arguments.length) return margin
    margin = Object.assign({}, margin, _)
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

