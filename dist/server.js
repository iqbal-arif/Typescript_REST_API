"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************IMPORTS */
/**Express Module from /node_modules */
var express = require("express");
var route_1 = require("./routes/route");
/***Initialize Express */
var app = express();
/********* FUNCTION SETUP EXPRESS
Express Routes and Express Middleware
*/
function setupExpress() {
    /****Express EndPoint aka Routes */
    /****Route is a mapping between URL accessing in endpoint and Request Handler processes the response to the request */
    /**Route Request Handler */
    // http://localhost:9000/
    app.route('/').get(route_1.root);
}
/********* FUNCTION START SERVER
 Logic to Start Server
 */
function startServer() {
    app.listen(9000, function () {
        console.log('HTTP REST API Server is now running at http://localhost:9000');
    });
}
/********* INVOKING THE FUNCTIONS *******/
setupExpress();
startServer();
