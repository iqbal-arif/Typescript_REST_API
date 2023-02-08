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
exports.findLessonsForCourse = void 0;
var logger_1 = require("../logger");
var utils_1 = require("../utils");
var data_source_1 = require("../data_source");
var lesson_1 = require("../models/lesson");
function findLessonsForCourse(request, response, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var courseId, query, pageNumber, pageSize, lessons, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    logger_1.logger.debug("Called findLessonsForCourse()");
                    courseId = request.params.courseId, query = request.query, pageNumber = (_a = query === null || query === void 0 ? void 0 : query.pageNumber) !== null && _a !== void 0 ? _a : '0', pageSize = (_b = query === null || query === void 0 ? void 0 : query.pageSize) !== null && _b !== void 0 ? _b : '3';
                    if (!(0, utils_1.isInteger)(courseId)) {
                        throw "Invalid course id ".concat(courseId);
                    }
                    if (!(0, utils_1.isInteger)(pageNumber)) {
                        throw "Invalid pageNumber ".concat(pageNumber);
                    }
                    if (!(0, utils_1.isInteger)(pageSize)) {
                        throw "Invalid pageSize ".concat(pageSize);
                    }
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(lesson_1.Lesson)
                            .createQueryBuilder('lessons')
                            .where('lessons.courseId = :courseId', { courseId: courseId }) //joining the lessons table with the courses table
                            .orderBy('lessons.seqNo')
                            .skip(pageNumber * pageSize)
                            .take(pageSize)
                            .getMany()];
                case 1:
                    lessons = _c.sent();
                    response.status(200).json({ lessons: lessons });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _c.sent();
                    logger_1.logger.error("Error calling findLessonsForCourse()");
                    return [2 /*return*/, next(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findLessonsForCourse = findLessonsForCourse;
