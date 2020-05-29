const express = require ('express');
const router = express.Router();

const controller = require('../controller');
const Util = require('../util');

router.get('/api', async (req, res) => {
    try {
        await controller.getData().then((data) => {
            const parsedData = JSON.parse(data);
            if(Object.keys(parsedData).length === 0) return Util.serveInternalError(res);
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


router.get('/api*', async (req, res) => Util.serve405(req, res));
router.get('/static*', (req, res) => Util.serve405(req, res));
router.get('*', (req, res) => Util.serve405(req, res));

module.exports = router;