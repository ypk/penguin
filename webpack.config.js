const path = require("path");
const HTMLWebpackPlugin = require ("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/,
                    /server/
                ],
                use: [{
                    loader: "babel-loader"
                }]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [{
                    loader: "file-loader"
                }]
            },
            {
                test: /\.s(a|c)ss$/i,
                use: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ]
            }
        ]
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new HTMLWebpackPlugin({
            template: "./src/405.html",
            filename: "405.html"
        }),
        new MiniCSSExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from:  './src/*.png',
                    to: '[name].[ext]',
                    flatten: true,
                    globOptions: {
                        dot: true
                    }
                },
                './src/manifest.json',
                './src/serviceWorker.js'
            ]
        })
    ]
};