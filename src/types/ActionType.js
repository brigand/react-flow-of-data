const assert = require('assert');

class ActionType {
  constructor(type) {
    this.type = type;
    this.usages = [];
    this.components = [];
    this.constants = [];
    this.reducers = [];
    this.actionCreators = [];
  }

  addComponent({file, name, line}) {
    assert.ok(file, `action has no file`);
    assert.ok(name, `action has no name`);
    assert.ok(line != null, `action has no line`);

    const exists = this.components.find(x => 
      x.file === file && x.name === name && x.line === line
    );
    if (exists) return;

    this.components.push({file, name, line});
  }

  addUsage({file, name, line}) {
    assert.ok(file, `action has no file`);
    assert.ok(name, `action has no name`);
    assert.ok(line != null, `action has no line`);

    this.usages.push({file, name, line});
  }
}

module.exports = ActionType;

