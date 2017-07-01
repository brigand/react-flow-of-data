const makeFs = require('./utils/makeFs.js');
const makeLogger = require('./utils/makeLogger.js');

const makeUtils = (ctx) => {
  // state can be used to do things like cache file lookups
  const state = {};

  const fs = makeFs(ctx.base);
  const logger = makeLogger(ctx.logLevel);

  return {
    fs,
    logger,
  };
};

module.exports = makeUtils;

