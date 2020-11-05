import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import WebpackOpenBrowser from 'webpack-open-browser';
import WebpackConfig from './config/webpack.config';
import getPort from './utils/getPort';
import { HOST, DEFAULT_PORT, ENABLE_OPEN } from './config/constants';

const router = express.Router();

router.get('/simple/get', function (_req, res) {
  res.json({
    msg: `hello world`,
  });
});

const start = async () => {
  const PORT = await getPort(HOST, DEFAULT_PORT);
  const address = `http://${HOST}:${PORT}`;

  const publicPath = WebpackConfig.output!.publicPath! as string;

  // 如果有 --open参数 则打开窗口
  if (ENABLE_OPEN) {
    let openAddress = ENABLE_OPEN;
    if (ENABLE_OPEN === true) {
      openAddress = address;
      // 未设置和空串都视为根路径
      // publicPath = publicPath == null || publicPath === '' ? '/' : publicPath;
      // if (publicPath !== '/') {
      //   // 要注意处理没有带 '/' 前缀和后缀的情况
      //   openAddress = `${address}${publicPath.startsWith('/') ? '' : '/'}${publicPath}${
      //     publicPath.endsWith('/') ? '' : '/'
      //   }index.html`;
      // }
    }
    WebpackConfig.plugins!.push(new WebpackOpenBrowser({ url: openAddress as string }));
  }

  const app = express();
  const compiler = webpack(WebpackConfig);

  app.use(router);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath,
    }),
  );

  app.use(webpackHotMiddleware(compiler));

  app.use(express.static(__dirname));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  module.exports = app.listen(PORT, HOST, () => {
    console.log(`Server listening on ${address}, Ctrl+C to stop`);
  });
};

start();
