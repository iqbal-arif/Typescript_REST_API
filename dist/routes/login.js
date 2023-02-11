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
exports.login = void 0;
var logger_1 = require("../logger");
var data_source_1 = require("../data_source");
var users_1 = require("../models/users");
var utils_1 = require("../utils");
var JWT_SECRET = process.env.JWT_SECRET;
var jwt = require('jsonwebtoken'); //jsonwebtoken library to create token string
/**
 *
 * curl -X POST http://localhost:9001/api/login -H "Content-Type:application/json" -d '{"email": "test@angular-university.io", "password":"test"}'
 *
 */
function login(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, user, message, passwordHash, message, pictureUrl, isAdmin, authJwt, authJwtToken, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    logger_1.logger.debug("Called login()");
                    _a = request.body, email = _a.email, password = _a.password;
                    if (!email) {
                        throw "Could not extract the email from the request, aborting.";
                    }
                    if (!password) {
                        throw "Could not extract the plain text password from the request, aborting.";
                    }
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(users_1.User)
                            .createQueryBuilder('users')
                            .where('email = :email', { email: email })
                            .getOne()];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        message = "Login denied.";
                        logger_1.logger.info("".concat(message, " - ").concat(email));
                        response.status(403).json({ message: message });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, utils_1.calculatePasswordHash)(password, user.passwordSalt)];
                case 2:
                    passwordHash = _b.sent();
                    if (passwordHash != user.passwordHash) {
                        message = "Login denied.";
                        logger_1.logger.info("".concat(message, " - user with ").concat(email, " has entered the wrong password."));
                        response.status(403).json({ message: message });
                        return [2 /*return*/];
                    }
                    logger_1.logger.info("User ".concat(email, " has now logged in."));
                    pictureUrl = user.pictureUrl, isAdmin = user.isAdmin;
                    authJwt = {
                        userId: user.id,
                        email: email,
                        isAdmin: isAdmin,
                    };
                    return [4 /*yield*/, jwt.sign(authJwt, JWT_SECRET)];
                case 3:
                    authJwtToken = _b.sent();
                    response.status(200).json({
                        user: {
                            email: email,
                            pictureUrl: pictureUrl,
                            isAdmin: isAdmin,
                        },
                        authJwtToken: authJwtToken,
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    logger_1.logger.error("Error calling login()");
                    return [2 /*return*/, next(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
