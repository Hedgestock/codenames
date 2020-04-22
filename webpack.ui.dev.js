const common = require('./webpack.ui.js');
const merge = require('webpack-merge');

module.exports = merge(common, {
  mode: "development",

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  module: {
      rules: [
          {
              test: /\.ts(x?)$/,
              exclude: ["/node_modules/"],
              loader: 'ts-loader',
              options: {
                configFile: "ui.tsconfig.json",
              },
          },
          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          {
              enforce: "pre",
              test: /\.js$/,
              loader: "source-map-loader"
          }
      ]
  },
});