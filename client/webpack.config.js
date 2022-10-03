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
      // Manifest File
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      }),
      // Service Worker
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "J.A.T.E.",
        description: "Takes notes with JavaScript syntax highlighting!",
        background_color: "#ffffff",
        crossorigin: "use-credentials", //can be null, use-credentials or anonymous
        // https://www.npmjs.com/package/webpack-pwa-manifest
        // icons: [
        //   {
        //     src: path.resolve("src/assets/icon.png"),
        //     sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
        //   },
        //   {
        //     src: path.resolve("src/assets/large-icon.png"),
        //     size: "1024x1024", // you can also use the specifications pattern
        //   },
        //   {
        //     src: path.resolve("src/assets/maskable-icon.png"),
        //     size: "1024x1024",
        //     purpose: "maskable",
        //   },
        // ],
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
      ],
    },
  };
};
