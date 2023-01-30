/************IMPORTS */
/**Express Module from /node_modules */
import * as express from 'express';
import { root } from './routes/route';

/***Initialize Express */
const app = express();

/********* FUNCTION SETUP EXPRESS
Express Routes and Express Middleware
*/
function setupExpress() {
  /****Express EndPoint aka Routes */
  /****Route is a mapping between URL accessing in endpoint and Request Handler processes the response to the request */
  /**Route Request Handler */
  // http://localhost:9000/
  app.route('/').get(root);
}

/********* FUNCTION START SERVER
 Logic to Start Server
 */
function startServer() {
  //   console.log(process.argv); /*See Note 18 in REST_API_ReadMe.md*/

  const portArg = process.argv[2]; //index [2] because it contains PORT NUMBER.

  // Converting String to Number
  /*****Important NOTE ON parseInt*****/
  /*
    1. parsInt("9001"): result is 9001 
    1. parsInt("asdfjkl"): result is NaN 
    1. parsInt("9001asdafjkl"): result is 9001 (It takes the number part only*/

  app.listen(9000, () => {
    console.log('HTTP REST API Server is now running at http://localhost:9000');
  });
}

/********* INVOKING THE FUNCTIONS *******/
setupExpress();
startServer();
