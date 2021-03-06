var alter = require('../lib/alter.js');
var _ = require('lodash');
var Chainable = require('../lib/classes/chainable');
module.exports = new Chainable('cusum', {
  args: [
    {
      name: 'inputSeries',
      types: ['seriesList']
    },
    {
      name: 'base',
      types: ['number'],
      help: 'Number to start at. Basically just adds this to the beginning of the series'
    }
  ],
  help: 'Return the cumulative sum of a series, starting at a base.',
  fn: function cusumFn(args) {
    return alter(args, function (eachSeries, base) {
      var pairs = eachSeries.data;
      var total = base || 0;
      eachSeries.data = _.map(pairs, function (point, i) {
        total += point[1];
        return [point[0], total];
      });

      return eachSeries;
    });
  }
});
