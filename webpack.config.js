module.exports = {
  entry: './app/components/main.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  }
};
