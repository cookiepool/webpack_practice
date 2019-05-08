const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
  	home: './src/assets/home/index.js',
  	user: './src/assets/user/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader',
      },
      {
      	test: /\.css/,
      	include: [
      		path.resolve(__dirname, 'src')
      	],
      	use: [
      		'style-loader',
      		'css-loader'
      	]
      },
      {
      	test: /\.(png|jpg|jpeg|gif)$/,
      	use: [
      		{
      			loader: 'file-loader',
      			options: {}
      		}
      	]
      },
      //处理图片打包路径等问题（没这个图片默认不打包）
      {
      	test: /\.(png|jpg|jpeg|gif)$/,
      	use: [
      		{
      			loader: 'url-loader',
      			options: {}
      		}
      	]
      }
    ],
  },

  // 代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
    ],

    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },

  plugins: [
    new UglifyPlugin(), 
    // 使用 uglifyjs-webpack-plugin 来压缩 JS 代码
    // 如果你留意了我们一开始直接使用 webpack 构建的结果，你会发现默认已经使用了 JS 代码压缩的插件
    // 这其实也是我们命令中的 --mode production 的效果，后续的小节会介绍 webpack 的 mode 参数
    new HtmlWebpackPlugin({
    	filename: 'home/home.html',
    	template: 'src/assets/home/home.html'
    }),
    new HtmlWebpackPlugin({
    	filename: 'user/user.html',
    	template: 'src/assets/user/user.html'
    })
  ],

  devServer: {
  	port: 9000
  }
}