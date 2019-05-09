const path = require('path')
//压缩JS
const UglifyPlugin = require('uglifyjs-webpack-plugin')
//html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
//清除打包文件（主要是用于带hash的情况）
const CleanWebpackPlugin = require('clean-webpack-plugin')
//处理html中img标签引入的图片的打包问题
const HtmlWithimgLoader = require('html-withimg-loader')

module.exports = {
  //多页面入口
  entry: {
  	home: './src/assets/home/index.js',
  	user: './src/assets/user/index.js'
  },
  //出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
  },

  module: {
    rules: [
      {
      	//使用babel工具
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader',
      },
      {
      	//css加载器
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
      	//文件加载器
      	test: /\.(png|jpg|jpeg|gif)$/,
      	use: [
      		{
      			loader: 'file-loader',
      			options: {}
      		}
      	]
      },
      //处理图片打包路径等问题（没这个图片默认不打包,主要用于css里面的引入的背景图片）
      {
      	test: /\.(png|jpg|jpeg|gif)$/,
      	use: [
      		{
      			//loader 后面 limit 字段代表图片打包限制，这个限制并不是说超过了就不能打包，而是指当图片大小小于限制时会自动转成 base64 码引用。上例中大于8192字节的图片正常打包，小于8192字节的图片以 base64 的方式引用
      			//name 字段指定了在打包根目录（output.path）下生成名为 images 的文件夹，并在原图片名前加上8位 hash 值
      			loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
      		}
      	]
      },
      //处理html中img标签引入的图片
      {
      	test: /\.html$/,
      	use: [
      		{
      			loader: 'html-withimg-loader'
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
  	//用来清除dist下的打包文件
  	new CleanWebpackPlugin(), //新版本参数是个对象，不能用数组了，比如new CleanWebpackPlugin(['dist'])这种会报错
  	//用来压缩JS代码
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