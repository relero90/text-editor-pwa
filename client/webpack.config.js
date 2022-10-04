const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      // TODO: Add and configure workbox plugins for a service worker and manifest file.
      //  service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // Manifest File
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "J.A.T.E.",
        fingerprints: false,
        inject: false,
        description: "Takes notes with JavaScript syntax highlighting!",
        background_color: "#ffffff",
        crossorigin: "use-credentials",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("src", "images"),
          },
        ],
      }),
      new MiniCssExtractPlugin(),
    ],
    // TODO: Add CSS loaders and babel to webpack.
    module: {
      rules: [
        // CSS loader
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        // Babel
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
  };
};
