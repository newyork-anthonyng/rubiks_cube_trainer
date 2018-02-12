const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const ReactLoadablePlugin = require("react-loadable/webpack")
  .ReactLoadablePlugin;

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
    new ReactLoadablePlugin({
      filename: "./dist/react-loadable.json"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "dev")
      }
    }),
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      filename: "files.json",
      template: path.join(__dirname, "views", "index.ejs"),
      inject: false
    }),
    new CleanWebpackPlugin(["dist"]),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false
    })
  ]
};

module.exports = clientConfig;
