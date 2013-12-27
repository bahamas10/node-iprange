var EventEmitter = require('events').EventEmitter;
var util = require('util');

var ipfunctions = require('ipfunctions');
var Netmask = require('netmask').Netmask;

module.exports = iprange;
module.exports.IPEmitter = IPEmitter;

// callback style
function iprange(s) {
  if (s.indexOf('/') < 0)
    return [s]; // just a single IP

  var block = new Netmask(s);

  var firstlong = ipfunctions.ip2long(block.first);
  if (block.size > 2)
    firstlong -= 1;

  var r = [];
  for (var i = 0; i < block.size; i++) {
    var ip = i + firstlong;
    r.push(ipfunctions.long2ip(ip));
  }

  return r;
}

// EventEmitter style
util.inherits(IPEmitter, EventEmitter);
function IPEmitter(s) {
  process.nextTick(_ipemitter.bind(this));

  function _ipemitter() {
    if (s.indexOf('/') < 0) {
      // just a single IP
      this.emit('ip', s);
      this.emit('end');
      return;
    }

    var block;
    try {
      block = new Netmask(s);
    } catch (e) {
      this.emit('error', e);
      return;
    }

    var firstlong = ipfunctions.ip2long(block.first);
    if (block.size > 2)
      firstlong -= 1;

    for (var i = 0; i < block.size; i++) {
      var ip = i + firstlong;
      this.emit('ip', ipfunctions.long2ip(ip));
    }

    this.emit('end');
  }
}
