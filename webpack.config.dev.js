const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack')
module.exports = {
  entry: "./src/index.js",
  output: {
    // The output directory as an absolute path
    path: path.resolve(__dirname, "dist"),
    // Determines the name of each output bundle.
    // For a single entry point, this can be a static name
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: "development",
  watch:true,
  resolve: {
    /* Attempt to resolve these extensions in order.
    If multiple files share the same name but have different extensions,
    webpack will resolve the one with the extension listed
    first in the array and skip the rest
    */
    extensions: ["js"],
    alias: {
      Utils: path.resolve(__dirname, 'src/utils/'),
      Images: path.resolve(__dirname, 'src/assets/images/'),
      Fonts: path.resolve(__dirname, 'src/assets/fonts/'),
      Styles: path.resolve(__dirname, 'src/styles/'),
      Templates: path.resolve(__dirname, 'src/templates/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|svr|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts",
            publicPath: "../assets/fonts/",
            esModule: false,
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new Dotenv()
  ],
};
