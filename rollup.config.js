import babel from 'rollup-plugin-babel'

export default {
  entry: 'index.js',
  format: 'umd',
  moduleName: 'd3_chart_scatter',
  plugins: [ babel() ],
  dest: 'build/d3-chart-scatter.js'
}
