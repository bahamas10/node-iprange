iprange
=======

Generate an array of all ips in a given subnet

Example
-------

### Node Module

``` js
var iprange = require('iprange');

var range = iprange('10.0.1.0/29');

console.log(range);
```

yields

```
[
  "10.0.1.0",
  "10.0.1.1",
  "10.0.1.2",
  "10.0.1.3",
  "10.0.1.4",
  "10.0.1.5",
  "10.0.1.6",
  "10.0.1.7"
]
```

### Command Line

    $ iprange 192.168.1.0/28
    192.68.1.0
    192.68.1.1
    192.68.1.2
    192.68.1.3
    192.68.1.4
    192.68.1.5
    192.68.1.6
    192.68.1.7
    192.68.1.8
    192.68.1.9
    192.68.1.10
    192.68.1.11
    192.68.1.12
    192.68.1.13
    192.68.1.14
    192.68.1.15

Installation
------------

    npm install [-g] iprange

License
-------

MIT License
