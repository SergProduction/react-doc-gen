const path = require('path')

module.exports = {
  context: __dirname,
  entry: path.resolve(__dirname, './test-code/index.js'),
  output: {
    path: path.resolve(__dirname, './test-code-result'),
    filename: 'bundle.js',
  },
  target: 'web',
  resolve: {
    moduleExtensions: ['.', './node_modules', path.join(__dirname, '/loaders')],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        loader: './loaders',
      },
    ]
  }
};