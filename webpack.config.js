var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    'main': './main.js'
  },
  output: {
    filename: 'main.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 8080,
    hot: true,
    inline: true
  }
};
