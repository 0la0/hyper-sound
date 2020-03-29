const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
  },
  output: {
    publicPath: 'dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'hypersound.js',
    sourceMapFilename: 'hypersound.js.map',
    library: 'hyper-sound',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$|\.html$|\.b64mp3$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  },
  devServer: {
    port: 3001,
    contentBase: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ],
    publicPath:  "/"
  },
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
};
