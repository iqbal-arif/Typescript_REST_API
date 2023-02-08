"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************IMPORTS ENVIRONMENT DOTENV MODULE*/
var dotenv = require("dotenv");
//Loads .env file contents into process.env.
var result = dotenv.config();
// Sanity Check for ENV data
if (result.error) {
    console.log("Error loading environment variables, aborting.");
    process.exit(1);
}
console.log(process.env.PORT);
/************IMPORTS */
// For TypeORM library
require("reflect-metadata"); //for decorator internal usage for data model classes
/**Express Module from /node_modules */
var express = require("express");
var root_1 = require("./routes/root");
var utils_1 = require("./utils");
var logger_1 = require("./logger"); // should load after environment load to work properly
var data_source_1 = require("./data_source");
var get_all_courses_1 = require("./routes/get_all_courses");
var default_error_handlers_1 = require("./middlewares/default_error_handlers");
var find_course_by_url_1 = require("./routes/find_course_by_url");
var find_lessons_for_course_1 = require("./routes/find_lessons_for_course");
var update_course_1 = require("./routes/update_course");
// CORS Package
var cors = require('cors');
// Body Parser
var bodyParser = require('body-parser');
/***Initialize Express */
var app = express();
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
    app.route('/').get(root_1.root);
    // Route To Get Courses
    app.route('/api/courses').get(get_all_courses_1.getAllCourses);
    // Route to Get Course by URL CourseUrl
    app.route('/api/courses/:courseUrl').get(find_course_by_url_1.findCourseByUrl);
    // Route to Get Lessons of a given Course
    app.route('/api/courses/:courseId/lessons').get(find_lessons_for_course_1.findLessonsForCourse);
    // Route to Update a Course PUT is a new version ; Patch means partial updates
    app.route('/api/courses/:courseId').patch(update_course_1.updateCourse);
    // Location of this handler is important
    app.use(default_error_handlers_1.defaultErrorHandler);
}
/********* FUNCTION START SERVER
 Logic to Start Server
 */
function startServer() {
    //   console.log(process.argv); /*See Note 18 in REST_API_ReadMe.md*/
    // process.argv picks argument from package.json script declaration.
    var port;
    /*******Importing the PORT from ".evn" file*******/
    var portEnv = process.env.PORT;
    /*******Importing the PORT from "package.json script via process.argv" file*******/
    var portArg = process.argv[2]; //index [2] because it contains PORT NUMBER.
    /****isInteger Check */
    if ((0, utils_1.isInteger)(portEnv)) {
        port = parseInt(portEnv);
    }
    // Converting String to Number
    /*****Important NOTE ON parseInt*****/
    /*
      1. parsInt("9001"): result is 9001
      1. parsInt("asdfjkl"): result is NaN
      1. parsInt("9001asdafjkl"): result is 9001 (It takes the number part only*/
    if (!port && (0, utils_1.isInteger)(portArg)) {
        port = parseInt(portArg);
    }
    //   if port is not defined or has
    if (!port) {
        port = 9000;
    }
    app.listen(port, function () {
        logger_1.logger.info("HTTP REST API Server is now running at http://localhost:".concat(port));
    });
}
/********** DATABASE INITIALIZATION*******/
data_source_1.AppDataSource.initialize()
    .then(function () {
    /********* INVOKING THE FUNCTIONS  After Database is Successfully initialized*******/
    logger_1.logger.info("The database has been initialized successfully.");
    setupExpress();
    startServer();
})
    .catch(function (err) {
    logger_1.logger.error("Error during datasource initialization.", err);
    process.exit(1);
});
