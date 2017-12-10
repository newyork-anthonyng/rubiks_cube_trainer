const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "src"),

  entry: "./index.js",

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[chunkhash].bundle.js"
  },

  module: {
    rules: [
      {
        use: "babel-loader",
        exclude: /node_modules/,
        test: /\.js$/
      }

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.ejs",
      template: path.join(__dirname, "views", "index.ejs"),
      markdown: `<div id="app"><%- markdown %></div>`
    }),
    new CleanWebpackPlugin(["dist"])
  ]
};
