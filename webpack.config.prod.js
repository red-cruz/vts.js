const path = require('path');

module.exports = {
  entry: './src/ValidateThenSubmit.js',
  output: {
    library: 'ValidateThenSubmit',
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename: 'ValidateThenSubmit.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: true,
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
