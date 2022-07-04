const { merge } 	= require('webpack-merge');
const common 		= require('./webpack.common.js');


// Tømmer dist mappen ved hver build
const { CleanWebpackPlugin } = require('clean-webpack-plugin');








module.exports = merge(common, {
	mode: 'production',


	plugins: [
		new CleanWebpackPlugin({
			cleanAfterEveryBuildPatterns: ['dist']
		})
	]
});