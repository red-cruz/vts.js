const path = require('path');

module.exports = {
  entry: {
    vts: './src/vts.js',
    defaults: './src/defaults.js',
    config: './src/config.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  watch: true,
};
