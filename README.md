# PNGN
Technical test for bertelsmann

This repository contains two servers to serve up test content.

A [Webpack](https://webpack.js.org/) based server which serves the front-end client (basically html, css, js based app) and;

A [Node.JS](https://nodejs.org/en/) + [Express](https://expressjs.com/) based server which serves JSON data and static images.

## Dev Instructions
Static client assets are located in `src` folder. HTML, JS and SCSS files are composed in the folder then `built`, `minimized` & `transpiled` to `dist` folder and are ready to be served.

Server files are located in `server` folder. The JavaScript files are then built and served on an API endpoint directly from the same folder

## Build Instructions

In order to build the app and serve it, follow the instructions below

Ensure that you have a NodeJS environment set up along with `npm` or `yarn` installed.

Depending on what's installed, navigate to the root directory of the repository and try the following commands 

|  yarn        |   npm           |
| ------------- |:-------------:|
| `yarn install`     | `npm install` |


## Serve Instructions

You need not build the app if you're serving locally as the serve command automatically builds the app.

Navigate to the root directory of the repository and try the following commands 

|  yarn        |   npm           |
| ------------- |:-------------:|
| `yarn run serveClient`     | `npm run serveClient` |
| `yarn run serveServer`     | `npm run serveServer` |


These commands will build and serve the apps on a stand alone server running on ports `8080` and `3000`

## One command to serve them all

Instead of running multiple commands to serve client and server manually, you could run both commands concurrently using the following command

|  yarn        |   npm           |
| ------------- |:-------------:|
| `yarn run serve`     | `npm run serve` |


# NOTE

You can configure the port on which the server runs by modifying the `apiPort` variable in `server/index.js`. Be Advised that if you change the port here then in order for the front end client to communicate with the API provider, the port number variable `APIPort` in `src/scripts/index.js` has to be changed to the same value.