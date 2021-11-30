const path = require("path"); //path ya viene  instalado en node, por lo que no debemos hacer esa instlacion.
const HtmlWebpackPlugin = require('html-webpack-plugin');


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
        },
      },
    ],
  },
  plugins:[
      new HtmlWebpackPlugin({
        inject: true,
        template: './public/index.html',
        filename: './index.html'
      })
  ],
};
