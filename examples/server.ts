import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import WebpackOpenBrowser from 'webpack-open-browser';
import multer from 'multer';
import atob from 'atob';
import WebpackConfig from './config/webpack.config';
import getPort from './utils/getPort';
import { HOST, DEFAULT_PORT, ENABLE_OPEN } from './config/constants';

const router = express.Router();
const upload = multer({ dest: 'upload/' });

router.get('/simple/get', function (_req, res) {
  res.json({
    msg: `hello world`,
  });
});

router.get('/cancel/get', function (_req, res) {
  res.json({
    msg: `hello world`,
  });
});

router.post('/more/post', function (req, res) {
  if (!req.headers.authorization) {
    res.end('UnAuthorization');
    return;
  }
  const auth = req.headers.authorization;
  const [type, credentials] = auth.split(' ');
  const [username, password] = atob(credentials).split(':');
  if (type === 'Basic' && username === 'Yee' && password === '123456') {
    res.json(req.body);
  } else {
    res.end('UnAuthorization');
  }
});

router.get('/more/304', function (_req, res) {
  res.status(304);
  res.end();
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

  app.post('/more/upload', upload.single('file'), function (req, res) {
    console.log(req.file);
    res.end('upload success!');
  });

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(__dirname));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  module.exports = app.listen(PORT, HOST, () => {
    console.log(`Server listening on ${address}, Ctrl+C to stop`);
  });
};

start();
