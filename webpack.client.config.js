const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const clientConfig = {
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
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "dev")
      }
    }),
    new HtmlWebpackPlugin({
      filename: "index.ejs",
      template: path.join(__dirname, "views", "index.ejs"),
      markup: `
        <div id="app"><%- markup %></div>
        <script type="text/javascript">
          window.__INITIAL_SCRAMBLE__ = "<%- initialScramble %>";
        </script>
      `,
    }),
    new CleanWebpackPlugin(["dist"])
  ]
};

module.exports = clientConfig;
