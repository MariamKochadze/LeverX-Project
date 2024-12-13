const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/pages/users/usersPage.tsx', // Change this back to your main TSX entry
        userDetails: './src/pages/userDetails/userDetails.tsx',
        signIn: './src/pages/signIn/signIn.tsx',
        edit: './src/pages/edit/edit.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
                    },
                },
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: `@use "sass:math";`,
                        },
                    },
                ],
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
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss'],
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true,
        historyApiFallback: true,
        port: 3000,
    },
};
