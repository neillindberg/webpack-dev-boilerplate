const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
console.log('COMMON');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    resolve: {
        extensions: [
            '*',
            '.js',
            '.jsx'
        ]
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|m4a|woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Xin Ya\'s Memory Game'
        }),
        new HtmlWebpackRootPlugin(),
        new CleanWebpackPlugin()
    ]
};
