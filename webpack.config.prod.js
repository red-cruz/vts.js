const path = require('path');

module.exports = {
  entry: './src/Vts.js',
  output: {
    library: 'Vts',
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename: 'Vts.js',
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
