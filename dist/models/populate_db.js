"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/************IMPORTS ENVIRONMENT DOTENV MODULE*/
var dotenv = require("dotenv");
//Loads .env file contents into process.env.
var result = dotenv.config();
// For TypeORM library needed for
require("reflect-metadata"); //for decorator internal usage for data model classes
var db_data_1 = require("./db_data");
var data_source_1 = require("../data_source");
var course_1 = require("./course");
var lesson_1 = require("./lesson");
var users_1 = require("./users");
var utils_1 = require("../utils");
function populateDb() {
    return __awaiter(this, void 0, void 0, function () {
        var courses, courseRepository, lessonsRepository, _i, courses_1, courseData, course, _a, _b, lessonData, lesson, users, _c, users_2, userData, email, pictureUrl, isAdmin, passwordSalt, plainTextPassword, user, _d, _e, totalCourses, totalLessons;
        var _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, data_source_1.AppDataSource.initialize()];
                case 1:
                    _g.sent();
                    console.log("Database connection ready.");
                    courses = Object.values(db_data_1.COURSES);
                    courseRepository = data_source_1.AppDataSource.getRepository(course_1.Course);
                    lessonsRepository = data_source_1.AppDataSource.getRepository(lesson_1.Lesson);
                    _i = 0, courses_1 = courses;
                    _g.label = 2;
                case 2:
                    if (!(_i < courses_1.length)) return [3 /*break*/, 8];
                    courseData = courses_1[_i];
                    console.log("Inserting course ".concat(courseData.title));
                    course = courseRepository.create(courseData);
                    return [4 /*yield*/, courseRepository.save(course)];
                case 3:
                    _g.sent();
                    _a = 0, _b = courseData.lessons;
                    _g.label = 4;
                case 4:
                    if (!(_a < _b.length)) return [3 /*break*/, 7];
                    lessonData = _b[_a];
                    console.log("Inserting lesson ".concat(lessonData.title));
                    lesson = lessonsRepository.create(lessonData);
                    lesson.course = course;
                    return [4 /*yield*/, lessonsRepository.save(lesson)];
                case 5:
                    _g.sent();
                    _g.label = 6;
                case 6:
                    _a++;
                    return [3 /*break*/, 4];
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8:
                    users = Object.values(db_data_1.USERS);
                    _c = 0, users_2 = users;
                    _g.label = 9;
                case 9:
                    if (!(_c < users_2.length)) return [3 /*break*/, 13];
                    userData = users_2[_c];
                    console.log("Inserting user: ".concat(userData));
                    email = userData.email, pictureUrl = userData.pictureUrl, isAdmin = userData.isAdmin, passwordSalt = userData.passwordSalt, plainTextPassword = userData.plainTextPassword;
                    _e = (_d = data_source_1.AppDataSource.getRepository(users_1.User)).create;
                    _f = {
                        email: email,
                        pictureUrl: pictureUrl,
                        isAdmin: isAdmin,
                        passwordSalt: passwordSalt
                    };
                    return [4 /*yield*/, (0, utils_1.calculatePasswordHash)(plainTextPassword, passwordSalt)];
                case 10:
                    user = _e.apply(_d, [(_f.passwordHash = _g.sent(),
                            _f)]);
                    return [4 /*yield*/, data_source_1.AppDataSource.manager.save(user)];
                case 11:
                    _g.sent();
                    _g.label = 12;
                case 12:
                    _c++;
                    return [3 /*break*/, 9];
                case 13: return [4 /*yield*/, courseRepository.createQueryBuilder().getCount()];
                case 14:
                    totalCourses = _g.sent();
                    return [4 /*yield*/, lessonsRepository.createQueryBuilder().getCount()];
                case 15:
                    totalLessons = _g.sent();
                    console.log(" Data Inserted - courses ".concat(totalCourses, ", lessons ").concat(totalLessons));
                    return [2 /*return*/];
            }
        });
    });
}
populateDb()
    .then(function () {
    console.log("Finished populating database, exiting!");
    process.exit(0);
})
    .catch(function (err) {
    console.error("Error populating database.", err);
});
