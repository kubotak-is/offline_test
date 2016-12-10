const webpack = require('webpack');

module.exports = {
    entry: {
      "register": "./src/es6/register.js",
      "serviceworker": "./src/es6/serviceworker.js"
    },
    output: {
      path: __dirname + '/public',
      filename: "[name].js"
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    resolve: {
      extensions:['', '.js'],
      modulesDirectories: [
        'node_modules'
      ]
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ]
};
