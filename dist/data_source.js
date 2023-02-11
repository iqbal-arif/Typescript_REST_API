"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var lesson_1 = require("./models/lesson");
var course_1 = require("./models/course");
var users_1 = require("./models/users");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    //For Development Environment
    // ssl: false,
    // extra: {
    //   ssl: {
    //     rejectUnauthorized: true,
    //   },
    // },
    entities: [course_1.Course, lesson_1.Lesson, users_1.User],
    // synchronize flag configure database and crates tables
    synchronize: true,
    logging: true,
});
