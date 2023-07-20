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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
// Middleware function to handle JWT authentication and authorization
const protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    // Check if the authorization header starts with 'Bearer' and extract the token
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // Verify the token and decode the payload
            let secret = process.env.JWT_SECRET;
            const id = jsonwebtoken_1.default.verify(token, secret).id;
            // Find the user by their ID and exclude the password field
            const user = yield userModel_1.default.findById(id);
            if (user) {
                req.user = user;
            }
            // Call the next middleware or route
            next();
        }
        catch (error) {
            // If the token is invalid or has expired, throw an error
            console.error(error);
            res.status(401);
            throw new Error('Not Authorized, token failed');
        }
    }
    // If no token is provided,  throw an error
    if (!token) {
        res.status(401);
        throw new Error('Not Authorized, no token');
    }
}));
exports.protect = protect;
