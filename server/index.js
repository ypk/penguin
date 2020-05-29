const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const router = require('./routes');

const app = express();
const apiPort = 3000

app.use(compression());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(helmet());

app.use('/', router);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))