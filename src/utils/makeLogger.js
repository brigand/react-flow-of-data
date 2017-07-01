const levels = ['silly', 'debug', 'info', 'warn', 'error'];
const makeLogger = (level = 'error', logFn = console.error) => {
  const targetLevel = levels.indexOf(level);

  if (targetLevel === -1) {
    throw new Error(`logger util received log level ${level} but expected one of "${levels}"`);
  }

  const logger = levels.reduce((acc, level, i) => {
    acc[level] = (...args) => {
      if (i >= level) {
        logFn(...args);
      }
    };
    return acc;
  }, {});
  return logger;
};

module.exports = makeLogger;

