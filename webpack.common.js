var PACKAGE = require('./package.json')
var version = PACKAGE.version

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = process.env.NODE_ENV !== 'production'
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
// const TerserPlugin = require('terser-webpack-plugin')





module.exports = {
	mode: process.env.NODE_ENV === "production" ? "production" : "development",

	entry: {
		'reimer-inde-slideshow': "./src/js/index.js"
	},

	resolve: {
		alias: {
			'images': path.resolve(__dirname, 'src/images/')
		}
	},

	output: {
		path: path.resolve(__dirname, 'dist/'),
		filename: '[name].js'
	},

	optimization: {
		minimize: true,
		// minimizer: [
		// 	new TerserPlugin({
		// 		terserOptions: {
		// 			keep_classnames: true,
		// 			keep_fnames: true
		// 		}
		// 	})
		// ]
	},

	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "./../",
						},
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: "sass-loader",
						options: {},
					}
				]
			},

			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-object-rest-spread']
					}
				}
			},

			{
				test: /\.(png|jpe?g|gif)$/i,
				type: "asset/source",
				// generator: {
				// 	filename: "images/[name][ext]",
				// }
			},

			{
				test: /\.(svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: "svg/[name][ext]",
				}
				// type: 'asset/inline'
			},

			{
				test: /\.(mp4|m4v|webm)$/,
				type: "asset/resource",
				generator: {
					filename: "svg/[name][ext]",
				}
			},

			{
				test: /\.(woff|woff2|eot|ttf)$/,
				type: "asset/resource",
				generator: {
					filename: "fonts/[name][ext]",
				}
			},
		],
	},

	plugins: [


		new MiniCssExtractPlugin({
			filename: devMode ? "[name].css" : "[name].[hash].css",
			chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
		}),


		new BrowserSyncPlugin(
			{
				host: "localhost",
				port: 3000,
				proxy: "http://localhost:8888/",
				files: [{
					match: [
						'**/*.php',
						'./wp-content/themes/**/*.php'
					],
					fn: (event, file) => {
						if (event === "change") {
							const bs = require('browser-sync').get('bs-webpack-plugin')
							bs.reload()
						}
					}
				}]
			},
			{
				reload: true
			}
		)
	],

	performance: {
		hints: false,
		maxEntrypointSize: 1024000,
		maxAssetSize: 1024000,
	}
};
