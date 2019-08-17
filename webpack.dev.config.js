const merge = require('webpack-merge');
const common = require('./webpack.common.config');

console.log('DEVELOPMENT');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: './dist'
    },
    devtool: 'source-map'
});
