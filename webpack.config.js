const path = require('path');
const DtsWebpackPlugin = require('dts-webpack-plugin');

module.exports = {
  entry: {
    config: './test/config.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
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
  plugins: [new DtsWebpackPlugin()],
};
