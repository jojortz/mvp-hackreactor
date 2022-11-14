require("dotenv").config();
// import { env } from 'process';

const path = require("path");
const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "/client/src/index.jsx"),
  output: {
    path: path.join(__dirname, "/client/dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  // devServer: {
  //   index: "",
  //   proxy: {
  //     context: () => true,
  //     target: "http://localhost:3000",
  //   },
  // },
  plugins: [
    // new ReactRefreshPlugin(), // See note below...

    // This will allow you to refer to process.env variables
    // within client-side files at build-time:
    new webpack.DefinePlugin({
      "process.env": {
        TOKEN: JSON.stringify(process.env.TOKEN),
      },
    }),
  ],
};