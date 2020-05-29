const path = require('path');
const fourOFivePage = '../../dist/405.html';
const fourOFivePagePath = path.resolve(__dirname, fourOFivePage);

const getRequestURL = (req) => req.protocol + "://" + req.get('host') + req.originalUrl;

const serveInternalError = (req, res) => {
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

module.exports = {
    getRequestURL,
    serveInternalError,
    serve405
}