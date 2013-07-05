var ipfunctions = require('ipfunctions');
var Netmask = require('netmask').Netmask;

module.exports = iprange;

function iprange(s) {
  if (s.indexOf('/') < 0)
    return [s]; // just a single IP

  var block = new Netmask(s);

  var firstlong = ipfunctions.ip2long(block.first) - 1;

  var r = [];
  for (var i = 0; i < block.size; i++) {
    var ip = i + firstlong;
    r.push(ipfunctions.long2ip(ip));
  }

  return r;
}
