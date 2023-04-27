const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = (env, argv) => {

	const isProd = argv.mode === 'production'
	const isDev = !isProd

	const filename = ext => `[name].${isProd ? '[contenthash]' : ''}.bundle.${ext}`

	return {
		context: path.resolve(__dirname, 'src'), //Абсолютный путь до папки src
		entry: {
			main: ['@babel/polyfill', './index.js'] //Относительно context - папки src
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: filename('js')
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
			new CopyPlugin({ //Перенести файлы с src в dist
				patterns: [
					{ from: path.resolve(__dirname, 'src', 'favicon.ico'), to: path.resolve(__dirname, 'dist') },
				],
			}),
			new MiniCssExtractPlugin({  //Преобразует и минифицирует SCSS
				filename: filename('css')
			}),
			new CleanWebpackPlugin(), //Чистка папки dist
		],
		devtool: isDev ? 'source-map' : false, //Для удобного отслеживания -  в DevTools будет отображать расположение нужного файла в папке src, а не в папке сборке dist
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
}