const makeUtils = require('./makeUtils.js');

class Context {
  constructor() {
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

