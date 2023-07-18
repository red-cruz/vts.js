const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: './src/Vts.js',
  output: {
    library: 'Vts',
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename: 'Vts.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: true,
    // minimize: false,
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
* Vts - Validate then submit.
* (c) ${new Date().getFullYear()} Raymark Eduarte Dela Cruz
* Released under the MIT License.
*/`,
      raw: true,
    }),
  ],
};
