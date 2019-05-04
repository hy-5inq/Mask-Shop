const webpack = require(`webpack`);
const path = require(`path`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`)
const devMode = process.env.NODE_ENV !== `production`

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
					{
						loader: `postcss-loader`,
						options: {
							plugins: () => [require(`autoprefixer`)]
						}
					},
					`sass-loader`,
				],
			},
			{
				test : /\.(js|jsx)$/,
				exclude: /node_modules/,
				use : `babel-loader`,
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
		new webpack.ProgressPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: `[name].css`,
			chunkFilename: `[id].css`
		})
	],
	target : `web`,
}
