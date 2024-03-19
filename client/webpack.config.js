const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin')

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),

      new MiniCssExtractPlugin(),

      new WorkboxPlugin.GenerateSW(),

      new WebpackPwaManifest({
        // TODO: Create a manifest.json:
        name: 'Text_Editor',
        short_name: 'TE',
        description: 'Editing Text',
        background_color: '',
        theme_color: '',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('./favicon.ico'),
            sizes: [96],
            // destination: path.join('client', 'icons'),
          },
        ],
      }),
      // new InjectManifest({
      //   swSrc: './src/sw.js',
      //   swDest:'service-worker.js',
      // })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
