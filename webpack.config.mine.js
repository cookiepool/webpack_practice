const path = require('path');
const UglifyPlugin = reuire('uglifyjs-webpack-plugin');
module.exports = {
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				include: [
					path.resolve(__dirname, 'src')
				],
				use: 'babel-loader'
			}
		]
	},
	plugins: [
		new UglifyPlugin()
	],
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist'
	}
}