"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.createCourse = void 0;
var logger_1 = require("../logger");
var data_source_1 = require("../data_source");
var course_1 = require("../models/course");
/*
 *
 * curl -X POST http://localhost:9000/api/courses -H "Content-Type:application/json" -d '{"url": "firebase-bootcamp", "title": "Firebase Bootcamp", "iconUrl": "https://angular-university.s3-us-west-1.amazonaws.com/course-images/firebase-course-1.jpg","longDescription": "Complete guided tour to the Firebase ecosystem.", "category": "BEGINNER"}'
 *
 * {"url": "firebase-bootcamp", "title": "Firebase Bootcamp", "iconUrl": "https://angular-university.s3-us-west-1.amazonaws.com/course-images/firebase-course-1.jpg","longDescription": "Complete guided tour to the Firebase ecosystem.", "category": "BEGINNER"}
 *
 * */
function createCourse(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data_1, course, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    logger_1.logger.debug("Called createCourse()");
                    data_1 = request.body;
                    if (!data_1) {
                        throw "No data available, cannot save course.";
                    }
                    return [4 /*yield*/, data_source_1.AppDataSource.manager.transaction('REPEATABLE READ', function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                            var repository, result, course;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        repository = transactionalEntityManager.getRepository(course_1.Course);
                                        return [4 /*yield*/, repository
                                                .createQueryBuilder('courses')
                                                .select('MAX(courses.seqNo)', 'max')
                                                .getRawOne()];
                                    case 1:
                                        result = _b.sent();
                                        course = repository.create(__assign(__assign({}, data_1), { seqNo: ((_a = result === null || result === void 0 ? void 0 : result.max) !== null && _a !== void 0 ? _a : 0) + 1 }));
                                        return [4 /*yield*/, repository.save(course)];
                                    case 2:
                                        _b.sent();
                                        return [2 /*return*/, course];
                                }
                            });
                        }); })];
                case 1:
                    course = _a.sent();
                    response.status(200).json({ course: course });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    logger_1.logger.error("Error calling createCourse()");
                    return [2 /*return*/, next(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createCourse = createCourse;
