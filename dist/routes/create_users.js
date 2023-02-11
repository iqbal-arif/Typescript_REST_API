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
exports.createUser = void 0;
var logger_1 = require("../logger");
var data_source_1 = require("../data_source");
var users_1 = require("../models/users");
var utils_1 = require("../utils");
var crypto = require('crypto');
/**
 *
 * curl -X POST http://localhost:9001/api/users -H "Content-Type:application/json" -d '{"email": "new-user@angular-university.io", "pictureUrl":"https://avatars.githubusercontent.com/u/5454709", "password": "test123", "isAdmin": false}'
 *
 */
function createUser(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, pictureUrl, password, isAdmin, repository, user, message, passwordSalt, passwordHash, newUser, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    logger_1.logger.debug("Called createUser()");
                    _a = request.body, email = _a.email, pictureUrl = _a.pictureUrl, password = _a.password, isAdmin = _a.isAdmin;
                    if (!email) {
                        throw 'Could not extract the email from the request, aborting.';
                    }
                    if (!password) {
                        throw 'Could not extract the plain text password from the request, aborting.';
                    }
                    repository = data_source_1.AppDataSource.getRepository(users_1.User);
                    return [4 /*yield*/, repository
                            .createQueryBuilder('users')
                            .where('email = :email', { email: email })
                            .getOne()];
                case 1:
                    user = _b.sent();
                    if (user) {
                        message = "User with email ".concat(email, " already exists, aborting.");
                        logger_1.logger.error(message);
                        response.status(500).json({ message: message });
                        return [2 /*return*/];
                    }
                    passwordSalt = crypto.randomBytes(64).toString('hex');
                    return [4 /*yield*/, (0, utils_1.calculatePasswordHash)(password, passwordSalt)];
                case 2:
                    passwordHash = _b.sent();
                    newUser = repository.create({
                        email: email,
                        pictureUrl: pictureUrl,
                        isAdmin: isAdmin,
                        passwordHash: passwordHash,
                        passwordSalt: passwordSalt,
                    });
                    return [4 /*yield*/, data_source_1.AppDataSource.manager.save(newUser)];
                case 3:
                    _b.sent();
                    logger_1.logger.info("User ".concat(email, " has been created."));
                    response.status(200).json({
                        email: email,
                        pictureUrl: pictureUrl,
                        isAdmin: isAdmin,
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    logger_1.logger.error("Error calling createUser()");
                    return [2 /*return*/, next(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createUser = createUser;
