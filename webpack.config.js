const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/script.ts',
    userDetails: './src/pages/user-details/user-details.ts',
    signIn: './src/pages/sign-in/sign-in.ts',
    edit: './src/pages/permission/permission.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.html'],
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['main'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/pages/sign-in/sign-in.html'),
      filename: 'sign-in.html',
      chunks: ['signIn'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        'src/pages/user-details/user-details.html'
      ),
      filename: 'user-details.html',
      chunks: ['userDetails'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/pages/permission/permission.html'),
      filename: 'permission.html',
      chunks: ['edit'],
      inject: true,
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'src'),
        publicPath: '/src',
      },
      {
        directory: path.join(__dirname, 'dist'),
        publicPath: '/',
      },
    ],
    hot: true,
  },
};
