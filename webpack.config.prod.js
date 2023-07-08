const path = require('path');

module.exports = {
  entry: './src/ValidateThenSubmit.js',
  output: {
    library: 'ValidateThenSubmit',
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename: 'ValidateThenSubmit.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
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
