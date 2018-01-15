const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

const serverConfig = {
  context: path.join(__dirname, "routes"),

  entry: "./index.js",

  output: {
    path: path.join(__dirname, "dist"),
    filename: "indexRoute.js",
    libraryTarget: "commonjs2"
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

  target: "node",

  externals: [
    nodeExternals({
      whitelist: ["worker-timers"]
    })
  ],

  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /worker-timers/,
      "./mock-worker-timers.js"
    )
  ]
};

module.exports = serverConfig;
