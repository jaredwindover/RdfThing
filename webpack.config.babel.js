module.exports = {
	resolve: {
		extensions: [".jsx", ".js"]
	},
	entry: ['./js/main.js'],
	module: {
		rules: [
			{
				test: /\.js?x?$/,
				exclude: [/(node_modules)/],
				loader: 'babel-loader',
				options: {
					presets: [[
						'@babel/preset-env',
						{targets: {firefox: 65}}
					], [
						'@babel/preset-react'
					]],
					plugins: ['react-html-attrs']
				}
			}
		]
	},
	devtool: 'source-map',
	output: {
		publicPath: '/',
		filename: 'main.min.js'
	},
	devServer: {
		disableHostCheck: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET'
		},
		watchOptions: {
			ignored: /node_modules/
		}
	}
};
