# d3-chart-scatter

SVG Scatter/Bubble chart

## Installing

If you use NPM, `npm install d3-chart-scatter`. Otherwise, download the [latest release](https://github.com/bobmonteverde/d3-chart-scatter/releases/latest).


```html
<script src="https://d3js.org/d3-array.v0.7.min.js"></script>
<script src="https://d3js.org/d3-collection.v0.1.min.js"></script>
<script src="https://d3js.org/d3-color.v0.4.min.js"></script>
<script src="https://d3js.org/d3-format.v0.5.min.js"></script>
<script src="https://d3js.org/d3-interpolate.v0.5.min.js"></script>
<script src="https://d3js.org/d3-time.v0.2.min.js"></script>
<script src="https://d3js.org/d3-time-format.v0.3.min.js"></script>
<script src="https://d3js.org/d3-scale.v0.7.min.js"></script>
<script src="https://d3js.org/d3-selection.v0.7.min.js"></script>
<script src="https://d3js.org/d3-dispatch.v0.4.min.js"></script>
<script src="https://d3js.org/d3-ease.v0.7.min.js"></script>
<script src="https://d3js.org/d3-timer.v0.4.min.js"></script>
<script src="https://d3js.org/d3-transition.v0.2.min.js"></script>
<script src="https://d3js.org/d3-axis.v0.3.min.js"></script>
<script src="../node_modules/d3-chart-xybase/build/d3-chart-xybase.js"></script>
<script src="build/d3-chart-scatter.js"></script>
<script>

var chart = d3_chart_scatter.chart_scatter()

</script>
```

## Running the example

After running `npm install` in the root folder, to run the example start a simple server in the root folder.
For example, on linux/mac you can run `python -m SimpleHTTPServer 8888` and open `http://localhost:8888/example/chart_scatter.html`

## API Reference

<a name="chart_scatter" href="#chart_scatter">#</a> d3_chart_scatter.<b>chart_scatter</b>()

Constructs a new chart function and returns it.

<a name="chart" href="#chart">#</a> chart(<i>context</i>)

Render the chart to the given context, which may be either a selection of SVG container (either SVG or G element).

<a name="chartBase" href="#chartBase">#</a> chart.<b>chartBase</b>([<i>chartBase</i>])

If chartBase is provided, sets chart's base to this base and returns the chart.

If no argument passed, returns chart's chartBase.

<a name="values" href="#values">#</a> chart.<b>values</b>([<i>function</i>])

If function is provided, sets chart's getValues to function

If no argument passed, returns chart's chartBase.

Default: data => data.values

<a name="x" href="#x">#</a> chart.<b>x</b>([<i>function</i>])

If function is provided, sets chart's getX to function

If no argument passed, returns chart's chartBase.

Default: point => point.x

<a name="y" href="#y">#</a> chart.<b>y</b>([<i>function</i>])

If function is provided, sets chart's getY to function

If no argument passed, returns chart's chartBase.

Default: point => point.y

<a name="size" href="#size">#</a> chart.<b>size</b>([<i>function</i>])

If function is provided, sets chart's getSize to function

If no argument passed, returns chart's chartBase.

Default: point => point.size || 1

<a name="color" href="#color">#</a> chart.<b>color</b>([<i>function</i>])

If function is provided, sets chart's getColor to function

If no argument passed, returns chart's chartBase.

Default: point => point.color || 0

<a name="scaleX" href="#scaleX">#</a> chart.<b>scaleX</b>([<i>scale</i>])

If scale is provided, sets chart's x scale to this scale and returns the chart.

If no argument passed, returns chart's x scale.

Default: d3_scale.scaleLinear()

<a name="scaleY" href="#scaleY">#</a> chart.<b>scaleY</b>([<i>scale</i>])

If scale is provided, sets chart's y scale to this scale and returns the chart.

If no argument passed, returns chart's y scale.

Default: d3_scale.scaleLinear()

<a name="scaleSize" href="#scaleSize">#</a> chart.<b>scaleSize</b>([<i>scale</i>])

If scale is provided, sets chart's size scale to this scale and returns the chart.

If no argument passed, returns chart's size scale.

Default: d3_scale.scaleLinear()

<a name="scaleColor" href="#scaleColor">#</a> chart.<b>scaleColor</b>([<i>scale</i>])

If scale is provided, sets chart's color scale to this scale and returns the chart.

If no argument passed, returns chart's color scale.

Default: d3_scale.scaleCategory10()

<a name="sizeRange" href="#sizeRange">#</a> chart.<b>sizeRange</b>([<i>min</i>, <i>max</i>])

If [min, max] is provided, sets chart's size scale's range to this and returns the chart.

If no argument passed, returns chart's size scale's range.

Default: [5, 20]

<a name="width" href="#width">#</a> <i>chart</i>.<b>width</b>(<i>number</i>)

If width is passed, sets chart's overall width to value provided.

If no argument passed, returns current chart's width.

Default: 600

<a name="height" href="#height">#</a> <i>chart</i>.<b>height</b>(<i>number</i>)

If height is passed, sets chart's overall height to value provided.

If no argument passed, returns current chart's height.

Default: 400

<a name="margin" href="#margin">#</a> <i>chart</i>.<b>margin</b>(<i>object</i>)

If margin is passed, sets some or all of the chart's margins.

If no argument passed, returns current chart's margin.

Default: { "top": 10, "right": 10, "bottom": 30, "left": 40 }

<a name="dispatch" href="#dispatch">#</a> <i>chart</i>.<b>dispatch</b>(<i>dispatch</i>)

If dispatch is passed, sets chart's dispatch and returns the chart.

If no argument passed, returns current chart's dispatch.
