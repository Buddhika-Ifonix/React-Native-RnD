"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const speakeasy_1 = __importDefault(require("speakeasy"));
const generateOtp = () => {
    const secret = speakeasy_1.default.generateSecret({ length: 20 });
    const tokenOtp = speakeasy_1.default.totp({
        secret: secret.base32,
        encoding: 'base32'
    });
    return { secret: secret.base32, otp: tokenOtp };
};
exports.default = generateOtp;
