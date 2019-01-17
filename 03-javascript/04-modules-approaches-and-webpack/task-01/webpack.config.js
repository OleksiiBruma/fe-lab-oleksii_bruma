const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  watch: true,
    entry : './src/index.js',
    output : {
      filename: 'bundle.js',
          path: path.resolve(__dirname,'build'),
  },
    plugins : [new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
      new CleanWebpackPlugin(['build']),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })],
  resolve : {
    modules : [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]},
    module : {
      rules: [ {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[ext]'
          }
        }]
      },
        {
          test: /\.less$/,
          use: [{
            loader: MiniCssExtractPlugin.loader
          },
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader'
            },
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }]},}

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    config.devtool = 'none';
    config.optimization = {
      minimizer: [new UglifyJsPlugin()]
    };

    config.module.rules[0] =
        {
          test: /\.(jpg|jpeg|png|svg)$/,
          use: [
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true, // webpack@2.x and newer
              },
            },{
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'images/[name].[ext]'
              }
            }]
        };
    config.module.rules[1] = {
      test: /\.less$/,
          use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader'
      },
      {loader: 'postcss-loader'
      },
      {loader: 'less-loader'}]}}

  return config;
}