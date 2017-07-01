#!/usr/bin/env node
const yargs = require('yargs');
const run = require('./run');

process.on('unhandledRejection', (reason, p) => {
  console.error(`unhandledRejection`);
  console.error(reason);
  process.exit(1);
});

const argv = yargs
  .argv;

const configFile = argv._[0];
const dir = argv._[1];
run(dir, configFile).then(data => {
  console.log(JSON.stringify(data, null, 2));
});

