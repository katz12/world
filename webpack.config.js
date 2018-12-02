const path = require('path')

module.exports = [{
  entry: {
    bundle: './app.js',
    tools: './tools/country-map-builder.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
}]
