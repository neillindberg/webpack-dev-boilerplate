const merge = require('webpack-merge');
const common = require('./webpack.common.config');
console.log('PROD');

module.exports = merge(common, {
    mode: 'production'
});