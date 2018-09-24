const good = require('good');

const options = {
  ops: {
    interval: 1000,
  },
  reporters: {
    responseConsoleReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ response: '*' }],
    }, {
      module: 'good-console',
    }, 'stdout'],
  },
};

module.exports = {
  register: good,
  options,
};
