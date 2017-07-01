const isComponent = (fod, file) => {
  return file.text.indexOf('React.Component') !== -1;
};

module.exports = isComponent;

