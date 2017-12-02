const webpack = require("webpack");
const path = require("path");

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
  }
};
