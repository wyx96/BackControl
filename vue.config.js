module.exports = {
    lintOnSave:false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.1.5:8888/api/private/v1/',
                changeOrigin: true,
                pathRewrite: {'^/api' : ''}
            },
        }
    }
}