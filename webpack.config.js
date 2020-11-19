const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filname = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`
const jsLoader = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env']
			}
		}
	]

	if (isDev) {
		loaders.push('eslint-loader')
	}

	return loaders
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: ['@babel/polyfill', './index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: filname('js')
	},
	devtool: isDev ? 'source-map' : false,
	resolve: {
		extensions: ['.js'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src/core')
		}
	},
	devServer: {
		port: 4200,
		hot: isDev
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
			favicon: 'favicon.ico'
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: filname('css')
		})
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: jsLoader()
			}
		]
	}
}