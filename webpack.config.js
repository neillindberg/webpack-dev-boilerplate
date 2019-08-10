const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    'mode': 'development',
    'entry': './src/index.js',
    'output': {
        'filename': '[name].bundle.js',
        'path': path.resolve(__dirname, 'dist')
    },
    'resolve': {
        'extensions': [
            '*',
            '.js',
            '.jsx'
        ]
    },
    'module': {
        'rules': [
            {
                'test': /\.(s*)css$/,
                'use': [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                'test': /\.(png|svg|jpg|gif)$/,
                'use': 'file-loader'
            },
            {
                'test': /\.(woff|woff2|eot|ttf|otf)$/,
                'use': 'file-loader'
            },
            {
                'test': /\.(js|jsx)$/,
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
        new HtmlWebpackPlugin({
            'title': 'Xin Ya\'s Memory Game'
        }),
        new HtmlWebpackRootPlugin(),
        new CleanWebpackPlugin()
    ],
    'devServer': {
        'contentBase': './dist'
    }
};
