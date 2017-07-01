const nodeFs = require('fs');
const path = require('path');
const glob = require('glob');
const flatten = require('lodash/flatten');
const File = require('./File');
const makeLogger = require('./makeLogger.js');

const makeFs = (base, logger = makeLogger()) => {
  const fs = {};

  const makePath = fileName => path.resolve(base, fileName);

  fs.readP = (fileName) => {
    return new Promise((resolve, reject) => {
      nodeFs.readFile(makePath(fileName), 'utf-8', (err, content) => {
        if (err) return reject(err);
        resolve(content);
      });
    });
  };

  fs.statP = (fileName) => new Promise((resolve, reject) => {
    nodeFs.stat(makePath(fileName), (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });

  fs.globP = (pattern) => new Promise((resolve, reject) => {
    glob(path.resolve(base, pattern), (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });

  fs.readDirP = (dir, ext = 'js') => {
    return Promise.resolve().then(() => {
      const pattern = path.resolve(base, dir, `**/*.${ext}`);
      return fs.globP(pattern)
        .then((rawPaths) => {
          const paths = rawPaths.filter(p => p.indexOf('node_modules') === -1);
          const ps = paths.map((p) => {
            logger.silly(`Reading ${p}`);
            return new File(fs, p).withAll();
          });
          return Promise.all(ps);
        });
    });
  };

  return fs;
};

module.exports = makeFs;

