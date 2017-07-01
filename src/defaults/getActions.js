const {tt, getTokenMeta} = require('../utils/tokenUtils.js');

const getActions = (ctx, src) => {
  const tokens = getTokenMeta(src);
  for (const t of tokens) {
    if (t.type === tt.string || t.type === tt.name) {
      if (/^[A-Z_]{5,}$/.test(t.value)) {
        const action = ctx.getActions(t.value);
        action.addUsage(
      }
    }
  }
};

module.exports = getActions;

