const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: ['whatwg-fetch', './src/Vts.js'],
  output: {
    library: 'Vts',
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename: 'vts.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: true,
    minimize: true,
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
  plugins: [
    new webpack.BannerPlugin({
      banner: `/*!
* Vts.js - Validate then submit.
* (c) ${new Date().getFullYear()} Raymark Eduarte Dela Cruz
* Released under the MIT License.
*/`,
      raw: true,
    }),
  ],
};
