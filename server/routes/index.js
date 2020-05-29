const express = require ('express');
const path = require('path');
const router = express.Router();

const controller = require('../controller');

const fourOFivePage = '../../dist/405.html';
const fourOFivePagePath = path.resolve(__dirname, fourOFivePage);


const getRequestURL = (req) => req.protocol + "://" + req.get('host') + req.originalUrl;

const internalError = (req, res) => {
    console.info(`ERROR: Error in request originated from ${getRequestURL(req)}`);

    return res.status(500).send(`
        <h1>500 - Internal Server Error</h1>
        <hr />
        <p>Our highly trained team of monkeys are on the way to look at the issue</p>
        <p>Please don't pet them if you see one.</p>
    `);
}

const serve405 = (req, res) => {
    console.info(`INFO: Error in request originated from ${getRequestURL(req)}`);
    return res.status(405).sendFile(fourOFivePagePath);
}

router.get('/api', async (req, res) => {
    try {
        await controller.getData().then((data) => {
            const parsedData = JSON.parse(data);
            if(Object.keys(parsedData).length === 0) return internalError(res);
            console.info(`INFO: Serving JSON Data`);
            return res.status(200).json(parsedData)
        })
    } catch (error) {
        console.log(error)
    }
});

router.get('/img/:url', async (req, res) => {
    const imagePath = req.params.url;
    console.info(`INFO: Serving request from /static/img/${imagePath}`);
    try {
        await controller.getImage(imagePath).then((img) => {
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(img,'Base64');
        })
    } catch (error) {
        console.log(error)
    }
});


router.get('/api*', async (req, res) => serve405(req, res));
router.get('/static*', (req, res, next) => serve405(req, res));
router.get('*', (req, res) => {
    const path = getRequestURL(req);
    if(/.(css)$/.test(path) || /.(js)$/.test(path)){
      return controller.serveContent(req, res);
    }
    return serve405(req, res);
});

module.exports = router;