#!/usr/bin/env node
const yargs = require('yargs');
const run = require('./run');

const argv = yargs
  .argv;

const configFile = argv._[0];
const dir = argv._[1];
run(dir, configFile).then(data => {
  console.log(JSON.stringify(data, null, 2));
});

