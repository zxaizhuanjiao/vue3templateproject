// vue.config.js
const webpack = require('webpack')
const path = require('path')
function resolve(dir) {
	return path.join(__dirname, '.', dir)
}

module.exports = {
    outputDir: 'dist',
    lintOnSave: false, // 在保存时校验格式
    productionSourceMap: false, // 生产环境是否生成 SourceMap
    devServer: {
      open: true, // 启动服务后是否打开浏览器
      overlay: { // 错误信息展示到页面
        warnings: true,
        errors: true
      },
      host: '0.0.0.0',
      port: 8066, // 服务端口
      https: false,
      hotOnly: false,
      proxy: {
		[process.env.VUE_APP_API]: {
			target: `${process.env.VUE_APP_PATH}:${process.env.VUE_APP_PORT}/`, // 代理到 目标路径
			ws: true,
			changeOrigin: true,
			pathRewrite: {
				['^' + process.env.VUE_APP_API]: ''
				// '^/api': ''
			}
		}
	 },
    },
	chainWebpack: config => {
		// config.module
		//     .rule('svg')
		//     .exclude.add(resolve('src/icons'))
		//     .end()
		// config.module
		//     .rule('icons')
		//     .test(/\.svg$/)
		//     .include.add(resolve('src/icons'))
		//     .end()
		//     .use('svg-sprite-loader')
		//     .loader('svg-sprite-loader')
		//     .options({
		//         symbolId: 'icon-[name]'
		//     })
		//     .end()
		
	    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
		config.module
		    .rule('svg-sprite-loader')
		    .test(/\.svg$/)
		    .include
		    .add(resolve('src/icons')) // 处理svg目录
		    .end()
		    .use('svg-sprite-loader')
		    .loader('svg-sprite-loader')
		    .options({
		        symbolId: 'icon-[name]'
		    })
	},
	configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    }
}