'use strict';

var fs = require('fs'),
  argv = require('yargs').argv,
  tasks = fs.readdirSync('./gulp/tasks/');

require('./config');

// --release flag when executing a task
global.production = argv.production;

tasks.forEach(function (task) {
  require('./tasks/' + task);
});
