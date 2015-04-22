#!/usr/bin/env node

var ignorer = require('./ignorer.js');

var args = process.argv;
var cwd = process.cwd();

if (args.length != 3) {
  console.log('Wrong number of arguments, the correct usage is "ignorer file-name" ');
} else {
  var fileName = args[2];
  ignorer(fileName, cwd);
}