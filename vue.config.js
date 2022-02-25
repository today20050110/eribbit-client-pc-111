/* eslint-disable indent */
const path = require('path')
module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            // 那些文件自動引入, 需要絕對路徑
            // 需要path.join來拼接完整路徑
            patterns: [
                path.join(__dirname, './src/assets/styles/variables.less'),
                path.join(__dirname, './src/assets/styles/mixins.less')
            ]
        }
    }
}
