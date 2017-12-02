const webpack = require("webpack");
const path = require("path");

module.exports = {
  context: path.join(__dirname, "src"),

  entry: "./index.js",

  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
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
