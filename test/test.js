var assert = require('assert');

var iprange = require('../');

var tests = {
  '10.0.1.10': ['10.0.1.10'],
  '10.0.1.10/32': ['10.0.1.10'],
  '10.0.1.0/30': ['10.0.1.0', '10.0.1.1', '10.0.1.2', '10.0.1.3'],
  '192.168.1.0/29': ['192.168.1.0', '192.168.1.1', '192.168.1.2', '192.168.1.3', '192.168.1.4', '192.168.1.5', '192.168.1.6', '192.168.1.7'],
};

Object.keys(tests).forEach(function(ip) {
  console.log('testing %s', ip);
  assert.deepEqual(tests[ip], iprange(ip));
});
