import webpack, { Configuration } from 'webpack';
import path from 'path';
import fs from 'fs';

const baseDir = path.resolve(__dirname, '../');
// const rootDir = path.resolve(__dirname, '../../');

const webpackconfig: Configuration = {
  mode: 'development',

  entry: fs.readdirSync(baseDir).reduce((entries: { [K: string]: string[] }, dir: string) => {
    const fullDir = path.join(baseDir, dir);
    const entry = path.join(fullDir, 'app.ts');

    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry];
    }
    return entries;
  }, {}),

  output: {
    path: path.resolve(baseDir, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        loader: 'babel-loader',
        // 开启缓存
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../../src/'),
    },
  },

  devtool: 'eval-cheap-module-source-map',

  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],
};

export default webpackconfig;
