const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  /* https://www.robinwieruch.de/minimal-react-webpack-babel-setup/ */
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader'],
      },
      // {
      //   test: /\.jsx$/,
      //   exclude: /node_modules/,
      //   use: ['babel-loader', 'eslint-loader'],
      // },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};
