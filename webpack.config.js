const path = require("path"); //path ya viene  instalado en node, por lo que no debemos hacer esa instlacion.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  resolve: {
    extensions: [".js"],
    alias:{
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@style': path.resolve(__dirname, 'src/style/'),
      '@img': path.resolve(__dirname, 'src/img/'),
    }
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
      new MiniCssExtractPlugin({
        filename: 'assets/[name].[contenthash].css',
      }),
      new CopyPlugin({
        patterns: [
          { from: './src/img', to: './src/style/'}
        ]
      }), 
      new DotEnv(),
      new CleanWebpackPlugin(),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin()
      ]
    }
};
