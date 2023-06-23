const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    config: './src/config.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  watch: true,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'whatwg-fetch',
    }),
  ],
};
