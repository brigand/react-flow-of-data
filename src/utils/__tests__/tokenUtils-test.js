const {getTokenMeta} = require('../tokenUtils.js');

it(`works`, () => {
  getTokenMeta('var a = 1');
});

it(`tracks brackets`, () => {
  const t = getTokenMeta('a; if (true) { b; { c; } }');
  expect(t[0].value).toBe('a');
  expect(t[0].open).toEqual({
    paren: 0,
    curly: 0,
    bracket: 0,
  });

  const b = t[7];
  expect(b.value).toBe('b');
  expect(b.open).toEqual({
    paren: 0,
    curly: 1,
    bracket: 0,
  });
});

