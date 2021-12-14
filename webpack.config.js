const path = require("path"); //path ya viene  instalado en node, por lo que no debemos hacer esa instlacion.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/, //nos permite indicar que tipo de extensiones vamos a trabajar
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.css|.styl$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.png|.jpg/,
        type: './src/img/',
      }
    ],
  },
  plugins:[
      new HtmlWebpackPlugin({
        inject: true,
        template: './public/index.html',
        filename: './index.html'
      }), 
      new MiniCssExtractPlugin(),
      new CopyPlugin({
        patterns: [
          { from: './src/img', to: './src/style/'}
        ]
      })
    ]
};
