const path = require('path');

module.exports = {
  entry: {
    vts: './src/vts.js',
    'vts.defaults': './src/vts.defaults.js',
    'vts.config': './src/vts.config.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  watch: true,
};
