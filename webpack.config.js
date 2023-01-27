const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// TODO: Explain why we have use old js for export
module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
  mode: 'development',
  devServer: {
    port: '3004',
    open: true,
  },
};
