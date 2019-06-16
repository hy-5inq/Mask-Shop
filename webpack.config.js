const webpack = require(`webpack`);
const path = require(`path`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`)
const devMode = process.env.NODE_ENV !== `production`
const CompressionPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')

module.exports = {
	entry : {
		"bundle": path.join(__dirname,`/Components/src/Root.jsx`),
		"i18n-contents": path.join(__dirname,`/Components/lib/i18n-contents.js`),
	},
	output : {
		filename : `[name].js`,
		path : path.join(__dirname,`/public`),
    
	},
	devServer: {
		hot : true,
		contentBase: [			
			path.join(__dirname, `public`),
			path.join(__dirname, `Components`)],
		watchContentBase: true,
		historyApiFallback: true,
		compress: true,
		host: `0.0.0.0`,
		disableHostCheck: true,
		port: 9000,
	},
	mode : `development`,
	module : {
		rules : [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					devMode ? `style-loader` : MiniCssExtractPlugin.loader,
					`css-loader`,
				],
			},
			{
				test : /\.(js|jsx)$/,
				exclude: /node_modules/,
				use :  {
					loader: `babel-loader`,
					options: {
						plugins: [
							["transform-runtime", {
								"polyfill": false,
								"regenerator": true
							}]
						],
					},
				},
			},
			{
				test : /\.(woff|jpe?g|png|gif|svg)$/,
				exclude: /node_modules/,
				use: [{
					loader: `file-loader`,
					options: {
						name: `[name].[ext]`,
						outputPath: `assets/`,
					},
				}],
			},
		],
	},
	plugins : [
		// new CompressionPlugin({
		// 	compressionOptions: {
		// 	  numiterations: 15,
		// 	},
		// 	algorithm(input, compressionOptions, callback) {
		// 	  return zopfli.gzip(input, compressionOptions, callback);
		// 	},
		// }),
		new webpack.ProgressPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: `[name].css`,
			chunkFilename: `[id].css`
		}),
	],
	target : `web`,
}
