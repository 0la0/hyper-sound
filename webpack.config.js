const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

const { version } = packageJson;

const webpackConfig = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
  },
  output: {
    publicPath: 'dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'pssound.js',
    sourceMapFilename: 'pssound.js.map',
    library: 'ps-sound',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$|\.html$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      services: path.resolve(__dirname, 'src/services/')
    }
  },
  devServer: {
    port: 3001,
    contentBase: [
      // path.resolve(__dirname),
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ],
    publicPath:  "/"
  },
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version),
    }),
  ]
};

module.exports = webpackConfig;
