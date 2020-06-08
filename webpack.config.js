const path = require('path');

module.exports = {
  entry: {
    'rlite-calendar': './src/index.js',
  },
  output: {
    filename: !process.env.UNMIN ? '[name].min.js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  optimization: {
    minimize: !process.env.UNMIN
  },
};
