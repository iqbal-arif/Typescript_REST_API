"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = void 0;
function root(request, response) {
    /**All request.Method and response.Method for HTTP  */
    response.status(200).send('<h1>Express Server is Up and Running.</h1>');
}
exports.root = root;
