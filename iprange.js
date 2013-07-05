var Stream = require('stream');
var util = require('util');

var ipfunctions = require('ipfunctions');
var Netmask = require('netmask').Netmask;

module.exports = iprange;
module.exports.IPStream = IPStream;

// callback style
function iprange(s) {
  if (s.indexOf('/') < 0)
    return [s]; // just a single IP

  var block = new Netmask(s);

  var firstlong = ipfunctions.ip2long(block.first);
  if (block.size > 2) firstlong -= 1;

  var r = [];
  for (var i = 0; i < block.size; i++) {
    var ip = i + firstlong;
    r.push(ipfunctions.long2ip(ip));
  }

  return r;
}

// stream style
util.inherits(IPStream, Stream);
function IPStream(s) {
  Stream.call(this);
  this.readable = true;
  process.nextTick(go.bind(this));

  function go() {
    if (s.indexOf('/') < 0) {
      // just a single IP
      this.emit('data', s);
      this.emit('end');
      return;
    }

    var block;
    try {
      block = new Netmask(s);
    } catch (e) {
      return this.emit('error', e);
    }

    var firstlong = ipfunctions.ip2long(block.first);
    if (block.size > 2) firstlong -= 1;

    var r = [];
    for (var i = 0; i < block.size; i++) {
      var ip = i + firstlong;
      this.emit('data', ipfunctions.long2ip(ip));
    }

    this.emit('end');
  }
}
