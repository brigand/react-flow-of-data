const assert = require('assert');
const makeUtils = require('./makeUtils.js');

class Context {
  constructor(opts) {
    assert.ok(opts.base, `(internal) Context received a base path`);

    this.logLevel = opts.logLevel || 'warn';
    this.base = opts.base;
    this.config = opts.config;
    // things are like reducers, etc.
    this.things = {};
    this.utils = makeUtils(this);
  }

  addThing(type, value) {
    this.things[type] = this.things[type] || [];

    // TODO: validate?

    this.things[type].push(value);
  }
}

module.exports = Context;

