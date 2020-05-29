const fs = require("fs");
const path = require("path");
const util = require('util');

const readFile = util.promisify(fs.readFile);

const getData = () => {
    const dataLocation = path.resolve(__dirname, '../data/index.json');
    return readFile(dataLocation);
};


const getImage = (imagePath) => {
    const imageLocation = path.resolve(__dirname, `../static/img/${imagePath}`);
    return readFile(imageLocation);
};

const serveContent = (req, res) => {
    const resourcePath = req.path;
    return res.redirect(`://localhost:8080${resourcePath}`);
}

module.exports = {
    getData,
    getImage,
    serveContent
};