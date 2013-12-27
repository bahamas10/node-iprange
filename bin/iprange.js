#!/usr/bin/env node
/**
 * IP Range streamer
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * License: MIT
 */

var IPEmitter = require('../').IPEmitter;
var ip = process.argv[2];

if (!ip || ip === '-h' || ip === '--help') {
  console.error('usage: iprange <ip/mask>\n\nex: iprange 10.0.1.0/24');
  process.exit(1);
}

var stream = new IPEmitter(ip);
stream.on('ip', console.log);
