const assert = require('assert');
const ActionType = require('./types/ActionType.js');
const makeUtils = require('./makeUtils.js');

class Context {
  constructor(opts) {
    assert.ok(opts.base, `(internal) Context received a base path`);

    this.logLevel = opts.logLevel || 'warn';
    this.base = opts.base;
    this.config = opts.config;
    this.files = [];
    // things are like reducers, etc.
    this.things = {};

    this.actionsByType = {};

    this.utils = makeUtils(this);
  }

  addThing(type, value) {
    this.things[type] = this.things[type] || [];

    // TODO: validate?

    this.things[type].push(value);
  }

  getAction(type) {
    const action = this.actionsByType[type] || new ActionType(type);
    this.actionsByType[type] = action;
    return action;
  }

  setFiles(files) {
    this.files = files;
  }
}

module.exports = Context;

