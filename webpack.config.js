const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	context: path.resolve(__dirname, 'src'), //Абсолютный путь до папки src
	entry: {
		main: ['@babel/polyfill', './index.js'] //Относительно context - папки src
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	resolve: {
		extensions: ['.js'], //Чтобы не писать на конце .js
		alias: {
			'@': path.resolve(__dirname, 'src'), //Чтобы не писать './././'
			'@core': path.resolve(__dirname, 'core')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html" //Относительно context - папки src
		}),
		new FaviconsWebpackPlugin({
			logo: './favicon.ico',
		}),
		new MiniCssExtractPlugin({  //Преобразует и минифицирукт SCSS
			filename: '[name].bundle.css'
		})
	],
	module: {//Чтобы работать с разными файлами, не только с js - loader
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader, //Преобразует и минифицирукт SCSS
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{ // Babel
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
}