const {tt, getTokenMeta} = require('../utils/tokenUtils.js');

const getActions = (ctx, file) => {
  const tokens = getTokenMeta(file.content);
  let lastIdent = null;

  for (const t of tokens) {
    if (t.open.total === 0 && t.type === tt.name) {
      lastIdent = t.value;
    }
    if (t.type === tt.string || t.type === tt.name) {
      if (/^[A-Z_]{3,}$/.test(t.value)) {
        const action = ctx.getAction(t.value);
        action.addUsage({
          file: file.loc,
          name: lastIdent || file.name,
          line: t.line,
        });
      }
    }
  }
};

module.exports = getActions;

