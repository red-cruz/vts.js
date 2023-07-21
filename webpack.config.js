const path = require('path');

module.exports = {
  entry: {
    'vts.config': './test/vts.config.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'development',
  watch: true,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
};
