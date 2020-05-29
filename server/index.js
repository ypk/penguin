const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const router = require('./routes');

const app = express();
const apiPort = 3000;

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
};

app.use(compression({
  filter: shouldCompress,
  threshold: 0
}));

let setCache = function (req, res, next) {
    const period = 60 * 5;
    if (req.method == 'GET') {
      res.set('Cache-control', `public, max-age=${period}`)
    } else {
      res.set('Cache-control', `no-store, no-cache, max-age=0`)
    }
    next()
}

app.use(setCache);

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(helmet());

app.use('/', router);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))