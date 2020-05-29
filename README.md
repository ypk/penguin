# PNGN
Technical test for bertelsmann

![Screenshot](https://raw.githubusercontent.com/ypk/penguin/master/screenshot.png?token=AA7BICWJIBS6KSN6DXLYRPS62FUXU)

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

You can configure the port on which the server runs by modifying the `apiPort` variable in `server/index.js`.

Be Advised that if you change the port for the server, then in order for the front end client to communicate with the API provider,
the port number variable `APIPort` in `src/scripts/utils.js` has to be changed to the same value.

# Testing

A suite of simple test cases have been written in `.test.js` file located in `src/___tests___` folder. 
This project uses [Jest](https://jestjs.io/) to test the scripts

# PWA-Ready!

This app is PWA ready (sans few missing caveats namely a splash screen, HTTP2 Server, acceptable TTFB). In order to see it in action make sure that you have already ran the app once, then only run the client server `yarn run serveClient` and refresh the page to see it load without a backend!


# WAIT! I thought this was for AEM ?!

Obviously the main goal is to develop a component for AEM, The template, scripts and styles are written in such a way that the code can be directly `lifted and shifted` into AEM (with some caveats). 

There are multiple ways to solve this problem for AEM. 
* fetching jcr data using Sling Model OR Use-API and rendering the template using JSTL/HTL.
* fetching jcr data using Sling Model OR Use-API and rendering the data as data-attribute in the page, then using JavaScript to read the attributes on page render and reconstruct the UI from template. This can be achieved by using a custom library like [Component Manager](https://github.com/ypk/AEMComponentManager)

Depending on how AEM Development workflow is set up, LESS could used for styles, and vanilla JS could be used for JS;
or we could take a different approach completely by using [UI.Frontend](https://github.com/adobe/aem-guides-wknd) module and transpile latest ES5/6/7 code and process SASS/SCSS to styles using Webpack.
