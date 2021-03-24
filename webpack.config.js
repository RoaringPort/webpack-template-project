const path = require('path')
const HTMLWebPackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: './src/index.js', // main file
    watch: false,
    output: {
        path: path.resolve(__dirname, 'dist'), // output dir
        filename: 'main.js', // output file
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        extensions: ['.js'], // only .js files
    },
    devServer: {
        port: 9001
    },
    module: {
        rules: [
            {
                test: /\.m?js$/, // only .mjs or .js
                exclude: /node_modules/, // exclude node_modules
                use: {
                    loader: 'babel-loader', // use babel for this files
                },
            },
            {
                test: /\.css$/i, // only css files
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.png/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        name: '[name].[ext]',
                        outputPath: './assets/fonts/',
                        publicPath: './assets/fonts/',
                        esModule: false,
                    },
                },
            },
        ],
    },
    plugins: [
        new HTMLWebPackPlugin({ // use HTML file for project
            inject: true, // for create a file 
            template: './public/index.html', // html template file
            filename: './index.html', // create a dist file
        }),
        new MiniCSSExtractPlugin(), // minify plugin
        new CopyPlugin({ // copy all the images
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets/images'),
                    to: 'assets/images',
                },
            ],
        }),
    ],
}
