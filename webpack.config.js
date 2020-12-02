const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	};
	if (isProd) {
		config.minimizer = [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin()
		];
	}

	return config;
};

module.exports = {
	mode: 'development',
	entry: './src/ts/app/app.ts',
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: optimization(),
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.(png|jpg|svg)$/,
				use: ['file-loader']
			},
			{
				test: /\.ts$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: path.resolve(__dirname, 'tsconfig.json')
						}
					}
				]
			}
		]
	},
	devServer: {
		port: 4000,
		hot: isDev,
		open: true
	}
};
