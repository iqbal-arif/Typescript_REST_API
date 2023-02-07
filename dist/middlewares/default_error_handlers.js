"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultErrorHandler = void 0;
var logger_1 = require("../logger");
function defaultErrorHandler(err, //this err object only fills in when error occurs
request, response, next) {
    logger_1.logger.error("Default error handler triggered; reason: ", err);
    if (response.headersSent) {
        logger_1.logger.error("Response was already being written, delegating to built-in Express error handler.");
        return next(err);
    }
    //Default sever error
    response.status(500).json({
        status: 'error',
        message: 'Default error handling triggered, check logs.',
    });
}
exports.defaultErrorHandler = defaultErrorHandler;
