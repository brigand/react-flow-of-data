const acorn = require('acorn');

// Refer to https://github.com/ternjs/acorn/blob/master/src/tokentype.js#L55
const {tokTypes: tt} = acorn;
exports.tt = tt;

const getTokens = (str) => acorn.tokenizer(str, {locations: true});
exports.getTokens = getTokens;

const getTokenMeta = (tokens) => {
  if (typeof tokens === 'string') tokens = getTokens(tokens);

  const res = [];
  const open = {
    paren: 0,
    curly: 0,
    bracket: 0,
  };
  for (const token of tokens) {
    switch (token.type) {
      case tt.parenL: open.paren++; break;
      case tt.parenR: open.paren--; break;
      case tt.braceL: open.curly++; break;
      case tt.braceR: open.curly--; break;
      case tt.bracketL: open.bracket++; break;
      case tt.bracketR: open.bracket--; break;
    }

    res.push(Object.assign({}, token, {
      open: Object.assign({}, open),
      line: token.loc.start.line - 1,
    }));
  }
  return res;
};
exports.getTokenMeta = getTokenMeta;

