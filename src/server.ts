/************IMPORTS ENVIRONMENT DOTENV MODULE*/
import * as dotenv from 'dotenv';
//Loads .env file contents into process.env.
const result = dotenv.config();

// Sanity Check for ENV data
if (result.error) {
  console.log(`Error loading environment variables, aborting.`);
  process.exit(1);
}

console.log(process.env.PORT);

/************IMPORTS */
/**Express Module from /node_modules */
import * as express from 'express';
import { AppDataSource } from './data_source';
import { logger } from './logger'; // should load after environment load to work properly
import { root } from './routes/route';
import { isInteger } from './utils';

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
  // process.argv picks argument from package.json script declaration.

  let port: number;

  /*******Importing the PORT from ".evn" file*******/
  const portEnv = process.env.PORT;

  /*******Importing the PORT from "package.json script via process.argv" file*******/
  const portArg = process.argv[2]; //index [2] because it contains PORT NUMBER.

  /****isInteger Check */
  if (isInteger(portEnv)) {
    port = parseInt(portEnv);
  }

  // Converting String to Number
  /*****Important NOTE ON parseInt*****/
  /*
    1. parsInt("9001"): result is 9001 
    1. parsInt("asdfjkl"): result is NaN 
    1. parsInt("9001asdafjkl"): result is 9001 (It takes the number part only*/

  if (!port && isInteger(portArg)) {
    port = parseInt(portArg);
  }

  //   if port is not defined or has
  if (!port) {
    port = 9000;
  }
  app.listen(port, () => {
    logger.info(
      `HTTP REST API Server is now running at http://localhost:${port}`
    );
  });
}

/********** DATABASE INITIALIZATION*******/
AppDataSource.initialize()
  .then(() => {
    /********* INVOKING THE FUNCTIONS  After Database is Successfully initialized*******/
    logger.info(`The database has been initialized successfully.`);
    setupExpress();
    startServer();
  })
  .catch((err) => {
    logger.error(`Error during datasource initialization.`, err);
    process.exit(1);
  });
