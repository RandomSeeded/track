const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
};

// Webpack configuration
module.exports = {
  entry: [path.join(paths.JS, 'client.js')], // TODO (nw): use only those polyfills we need
  mode: 'development', // TODO (nw): make dependent on node_env
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
      filename:  path.join(paths.DIST, 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:17792',
        secure: false,
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
