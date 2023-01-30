/************IMPORTS */
/**Express Module from /node_modules */
import * as express from 'express';
// import { root } from './routes/route';

/***Initialize Express */
const app = express();

/********* FUNCTION SETUP EXPRESS
Express Routes and Express Middleware
*/
function setupExpress() {
  /****Express EndPoint aka Routes */
  /****Route is a mapping between URL accessing in endpoint and Request Handler processes the response to the request */
  /**Route Request Handler */
  //   app.route('/').get(root);
}

/********* FUNCTION START SERVER
 Logic to Start Server
 */
function startServer() {
  app.listen(9000, () => {
    console.log('HTTP REST API Server is now running at http://localhost:9000');
  });
}

/********* INVOKING THE FUNCTIONS *******/
setupExpress();
startServer();
