const path = require('path');

module.exports = {
  entry: ['./src/index.js', './static/styles.css'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
            "style-loader",
        "css-loader"
        ]
      }
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};