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
    publicPath: 'scripts/',
    path: path.resolve(__dirname, 'dist', 'scripts'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$|\.html$|\.worker.js$|\.vert$|\.frag$/,
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
    port: 3001
  },
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version),
    }),
  ]
};

module.exports = webpackConfig;
