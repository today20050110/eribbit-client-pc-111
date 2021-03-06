/* eslint-disable eol-last */
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
    },
    chainWebpack: config => {
        // 需要配置10kb下的图片打包成base64的格式
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10000 }))
            // 这个是给webpack-dev-server开启可IP和域名访问权限。
        config.devServer.disableHostCheck(true)
    },
    // # 这个是设置外部扩展，模块为qc变量名为QC，导入qc将不做打包。
    configureWebpack: {
        externals: {
            qc: 'QC'
        }
    }
}