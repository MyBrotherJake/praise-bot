'use strict';
const praise = require('./index.js');
const assert = require(('assert'));

praise.add("テストです");
praise.add("This is a test statement");
console.log(praise.list());
praise.del(7);
console.log(praise.list());
console.log(praise.praise());