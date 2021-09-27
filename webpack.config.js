const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    // The output directory as an absolute path
    path: path.resolve(__dirname, "dist"),
    // Determines the name of each output bundle.
    // For a single entry point, this can be a static name
    filename: "main.js",
  },
  resolve: {
    /* Attempt to resolve these extensions in order.
    If multiple files share the same name but have different extensions,
    webpack will resolve the one with the extension listed
    first in the array and skip the rest
    */
    extensions: ["js"],
  },
  module:{
    rules:[
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
