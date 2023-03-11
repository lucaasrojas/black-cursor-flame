const { merge } = require("webpack-merge");
const webpackConfig = require("./webpack.config");
const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports = merge(webpackConfig, {
  mode: "development",
  entry: "./src/index.tsx",
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
});