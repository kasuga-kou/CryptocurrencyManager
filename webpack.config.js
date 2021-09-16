const path = require('path');
// require('dotenv').default();

var main = {
  mode: 'development',
  target: 'electron-main',
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',

  // entry: path.join(__dirname, 'src', 'index'),
  // output: {

  //   filename: 'index.js',
  //   path: path.resolve(__dirname, 'dist'),
  // },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /.ts?$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
};

var renderer = {
  mode: 'development',
  target: 'electron-renderer',
  entry: path.join(__dirname, 'src', 'renderer', 'index'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist', 'scripts'),
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css', '.ts', '.tsx'],
  },
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: 'tsconfig.json',
            },
          },
        ],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules'),
        ],
      },
      {
        test: /(\.s[ac]ss)$/,
        use: [
          'style-loader',
          'css-loader?modules=true&url=false',
          // 'css-loader',
          'sass-loader',
        ],
        // include: [
        //   path.resolve(__dirname, 'src'),
        //   path.resolve(__dirname, 'node_modules'),
        // ],
      },
    ],
  },
};

module.exports = [main, renderer];
