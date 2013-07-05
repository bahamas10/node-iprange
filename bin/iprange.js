#!/usr/bin/env node

var iprange = require('../');
var ip = process.argv[2];

if (!ip) {
  console.error('usage: iprange <ip/mask>\n\nex: iprange 10.0.1.0/24');
  process.exit(1);
}

console.log(iprange(ip).join('\n'));
