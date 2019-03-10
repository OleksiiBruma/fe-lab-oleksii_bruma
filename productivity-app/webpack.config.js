const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  'mode': 'none',
  'entry': './src/app/app.js',
  'output': {
    'path': path.resolve(__dirname, 'dist'),
    'filename': 'bundle.js'
  },
  'resolve': {
    'modules': [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    'alias': {
      '@less-helpers-module': path.resolve(__dirname, 'src/assets/less/helpers'), // Alias for less helpers
      '@assets-root-path': path.resolve(__dirname, 'src/assets') // Alias for assets (use for images & fonts)
    }
  },
  'module': {
    'rules': [
      {
        'test': /\.less$/,
        'use': [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        'test': /\.(jpg|jpeg|png|svg)$/,
        'use': [
          {
            'loader': 'url-loader',
            'options': {
              'limit': 10000,
              'name': 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        'test': /\.(woff|woff2|eot|ttf|otf)$/,
        'use': ['file-loader']
      },
      {
        'test': /\.handlebars$/,
        'loader': 'handlebars-loader',
        'exclude': /(node_modules)/,
        'query': {
          'helperDirs': [`${__dirname}/src/app/handlebarsHelpers/`]
        }
      },
      {
        'test': /\.m?js$/,
        'exclude': /(node_modules|bower_components)/,
        'use': {
          'loader': 'babel-loader',
          'options': {
            'presets': ['@babel/preset-env']
          }
        }
      }
    ]
  },
  'plugins': [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
    }),
    new MiniCssExtractPlugin({
      'filename': 'styles.css'
    }),
    new CopyWebpackPlugin([
      'src/index.html', // Will copy to root of outDir (./dist folder)
      {
        'from': 'src/static/',
        'to': 'static'
      },
      {
        'from': 'src/assets/images',
        'to': 'images'
      },
      {
        'from': 'src/assets/fonts',
        'to': 'fonts'
      }
    ])
  ],
  'devServer': {
    'historyApiFallback': true,
    'contentBase': './dist',
    'port': 3000,
  },
  'devtool': 'eval-source-map'
}
