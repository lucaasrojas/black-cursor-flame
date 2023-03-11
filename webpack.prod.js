const { merge } = require("webpack-merge");
const webpackConfig = require("./webpack.config");
const path = require("path");
module.exports = merge(webpackConfig, {
  mode: "production",
  entry: "./index.ts",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js",
    libraryTarget: "commonjs2"
  },
});