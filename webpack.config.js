const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: ['./src/vts.js'],
  output: {
    library: 'Vts',
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename: 'vts.js',
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
        test: /\.ts|\.js$/,
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
