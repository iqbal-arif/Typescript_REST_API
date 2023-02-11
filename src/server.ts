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
// For TypeORM library
import 'reflect-metadata'; //for decorator internal usage for data model classes
/**Express Module from /node_modules */
import * as express from 'express';
import { root } from './routes/root';
import { isInteger } from './utils';
import { logger } from './logger'; // should load after environment load to work properly
import { AppDataSource } from './data_source';
import { getAllCourses } from './routes/get_all_courses';
import { defaultErrorHandler } from './middlewares/default_error_handlers';
import { findCourseByUrl } from './routes/find_course_by_url';
import { findLessonsForCourse } from './routes/find_lessons_for_course';
import { updateCourse } from './routes/update_course';
import { createCourse } from './routes/create_course';
import { deleteCourseAndLessons } from './routes/delete_course';
import { createUser } from './routes/create_users';
import { login } from './routes/login';
import { checkIfAuthenticated } from './middlewares/authentication_middleware';
import { checkIfAdmin } from './middlewares/admin_only.middleware';

// CORS Package
const cors = require('cors');

// Body Parser
const bodyParser = require('body-parser');

/***Initialize Express */
const app = express();

/********* FUNCTION SETUP EXPRESS
Express Routes and Express Middleware
*/
function setupExpress() {
  // CROSS Origin Request
  // This middleware will Add right Cross Origin Header to the REQ, then
  // Delegates the execution of the REQ to next middleware or end point in middleware
  app.use(cors({ origin: true }));

  //Body Parser for JSON content
  app.use(bodyParser.json());

  /****Express EndPoint aka Routes */
  /****Route is a mapping between URL accessing in endpoint and Request Handler processes the response to the request */
  /**Route Request Handler */
  // http://localhost:9000/
  app.route('/').get(root);
  // Route To Get Courses
  app.route('/api/courses').get(checkIfAuthenticated, getAllCourses);
  // Route to Get Course by URL CourseUrl
  app
    .route('/api/courses/:courseUrl')
    .get(checkIfAuthenticated, findCourseByUrl);
  // Route to Get Lessons of a given Course
  app
    .route('/api/courses/:courseId/lessons')
    .get(checkIfAuthenticated, findLessonsForCourse);
  // Route to Update a Course PUT is a new version ; Patch means partial updates
  app.route('/api/courses/:courseId').patch(checkIfAuthenticated, updateCourse);
  // Route to Create New Course
  app.route('/api/courses').post(checkIfAuthenticated, createCourse);
  // Route to Delete Course & Lesson
  app
    .route('/api/courses/:courseId')
    .delete(checkIfAuthenticated, deleteCourseAndLessons);
  // Route to Create User
  app.route('/api/users').post(checkIfAuthenticated, checkIfAdmin, createUser);
  // Route to Authentication
  app.route('/api/login').post(login);

  // Location of this handler is important
  app.use(defaultErrorHandler);
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
