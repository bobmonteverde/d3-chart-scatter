import d3_array from 'd3-array'
import d3_chart_xybase from 'd3-chart-xybase'
import d3_dispatch from 'd3-dispatch'
import d3_scale from 'd3-scale'
import d3_selection from 'd3-selection'
import d3_simple_tooltip from 'd3-simple-tooltip'
import rebind from './rebind'
import functor from './functor'
import scatter from './scatter'

export default function chart_scatter () {

  //============================================================
  // Public Variables with Default Settings
  //------------------------------------------------------------

  var chartBase      = d3_chart_xybase.chart_xybase(),
      scatterChart   = scatter(),
      useTooltip     = true,
      tooltipContent = (d, i) => `<div class="d3-tooltip-x">${scatterChart.x()(d, i)}</div><div class="d3-tooltip=y">${scatterChart.y()(d, i)}</div>`,
      height         = 400,
      width          = 600,
      margin         = { top: 20, right: 20, bottom: 30, left: 40 }

  chartBase
    .scaleBottom(scatterChart.scaleX())
    .scaleTop(scatterChart.scaleX())
    .scaleLeft(scatterChart.scaleY())
    .scaleRight(scatterChart.scaleY())

  //------------------------------------------------------------

  function chart(selection) {
    selection.each(function(data) {
      var availableWidth = width - margin.left - margin.right,
          availableHeight = height - margin.top - margin.bottom,
          container = d3_selection.select(this)

      if (availableHeight < 0) availableHeight = 0
      if (availableWidth < 0)  availableWidth = 0

      scatterChart
        .width(availableWidth)
        .height(availableHeight)

      scatterChart.dispatch().on('elementMouseover.tooltip', showTooltip)
      scatterChart.dispatch().on('elementMouseout.tooltip', hideTooltip)

      chartBase
        .margin(margin)
        .width(width)
        .height(height)

      //------------------------------------------------------------
      // Setup Chart Layers

      var wrap      = container.selectAll('g.d3-chart-scatter').data([data])
      var wrapEnter = wrap.enter().append('g').attr('class', 'd3-chart-scatter')
      var gEnter    = wrapEnter.append('g')
      var g         = container.select('.d3-chart-scatter g')

      wrapEnter.append('g').attr('class', 'd3-chart-base')
      gEnter.append('g').attr('class', 'd3-chart-scatter-wrap')

      g.attr('transform', `translate(${margin.left},${margin.top})`)

      //------------------------------------------------------------

      container.select('.d3-chart-scatter-wrap')
          .call(scatterChart)

      container.select('.d3-chart-base')
          .call(chartBase)


      function showTooltip(d, i) {
        if (!useTooltip) return;

        let left = scatterChart.scaleX()(scatterChart.x().apply(this, arguments)) + margin.left
        let top =  scatterChart.scaleY()(scatterChart.y().apply(this, arguments)) + margin.top

        d3_simple_tooltip.tooltip.show({
          pos: [left, top],
          content: tooltipContent.apply(this, arguments),
          gravity: 's',
          dist: 20,
          parent: container.node().parentNode
        })
      }

      function hideTooltip() {
        if (!useTooltip) return;
        d3_simple_tooltip.tooltip.cleanup();
      }

    })
  }

  //============================================================
  // Expose Public API
  //------------------------------------------------------------

  rebind(chart, scatterChart, 'values', 'x', 'y', 'size', 'color', 'scaleX', 'scaleY', 'scaleSize', 'scaleColor', 'sizeRange', 'dispatch')
  rebind(chart, chartBase, 'renderAxisBottom', 'renderAxisTop', 'renderAxisLeft', 'renderAxisRight', 'labelBottom', 'labelTop', 'labelLeft', 'labelRight', 'labelPosBottom', 'labelPosTop', 'labelPosLeft', 'labelPosRight')

  chart.chartBase = function(_) {
    if (!arguments.length) return chartBase
    chartBase = _
    return chart
  }

  chart.useTooltip = function(_) {
    if (!arguments.length) return useTooltip
    useTooltip = _
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

  //------------------------------------------------------------

  return chart
}

