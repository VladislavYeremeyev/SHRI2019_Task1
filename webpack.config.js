const path = require('path');

module.exports = {
  entry: './src/template-engine.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'template-engine.js'
  },
  node: {
    fs: 'empty'
  }
};
