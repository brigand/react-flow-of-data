const path = require('path');
const Context = require('./context.js');
const {defaultConfig} = require('./config');

const run = (base, configFile) => {
  const userConfig = require(path.resolve(process.cwd(), configFile));
  const config = Object.assign({}, defaultConfig, userConfig);
  let ctx;
  return Promise.resolve()
    .then(() => {
      ctx = new Context({
        base,
        config,
        logLevel: undefined,
      });
    })
    .then(() => {
      return ctx.utils.fs.readDirP('.');
    })
    .then((files) => {
      ctx.setFiles(files);
    })
    .then(() => {
      getActions(ctx);
      return ctx.actionsByType;
    });
};

const getActions = (ctx) => {
  ctx.files.forEach((file) => {
    ctx.config.getActions(ctx, file);
  });
};

module.exports = run;

