"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Function to generate a JSON web token
const generateToken = (id) => {
    // Create the token using the user's id and the JWT_SECRET as the secret
    // Set the token to expire in 30 days
    let secret = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign({ id }, secret, {
        expiresIn: '30d',
    });
};
exports.default = generateToken;
