const nodeFs = require('fs');
const path = require('path');
const makeFs = require('../makeFs.js');

const fixtureFs = path.resolve(__dirname, '..', '__fixtures__');

it(`works`, () => {
  makeFs(`/tmp/`);
});

it(`reads a file`, () => {
  return makeFs(fixtureFs).readP('foo/x.txt').then((c) => {
    expect(c).toBe(`x`);
  });
});

it(`reads a directory`, () => {
  return makeFs(fixtureFs).readDirP('.', 'txt').then((files) => {
    expect(files).toMatchSnapshot();
  });
});

