const path = require('path')
const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: ['./src/js/app.js', './src/style/main.scss'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|otf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    hot: true,
    port: 3000
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {}
      }
    }),
    new CleanWebpackPlugin(),
    new Dotenv({
      path: './.env'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-styles.css',
      chunkFilename: '[id].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      title: 'My awesome service',
      template: './src/index.hbs',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Products',
      template: './src/products.hbs',
      filename: 'products.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Signup',
      template: './src/signup.hbs',
      filename: 'signup.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Login',
      template: './src/login.hbs',
      filename: 'login.html'
    }),
    new CopyWebpackPlugin([
      { from: './src/static', to: 'static' }
    ])
  ]
}
