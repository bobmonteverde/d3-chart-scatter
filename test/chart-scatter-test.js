var tape = require('tape'),
    chart_scatter = require('../');

tape('chart_scatter() returns a chart function.', function(test) {
  test.equal(typeof chart_scatter.chart_scatter(), 'function');
  test.end();
});
