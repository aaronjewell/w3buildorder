const { join } = require("path")
const Sass = require("sass")
const { fileURLToPath } = require("url")
const VueLoaderPlugin = require("vue-loader/lib/plugin.js")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: ["./index.js", "./styles/index.scss"],
  output: {
    path: join(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 22528,
              esModule: false,
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
      },
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: Sass,
            },
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin(), new MiniCssExtractPlugin()],
  mode: "development",
}
