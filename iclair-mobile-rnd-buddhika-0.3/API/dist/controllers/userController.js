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
exports.authorization = exports.verifyOTP = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const generateOtp_1 = __importDefault(require("../Utils/generateOtp"));
const generateToken_1 = __importDefault(require("../Utils/generateToken"));
// @desc  Register a new User
// @route POST /api/users/auth
// @access Public
const authorization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.body;
    const phoneRegex = new RegExp(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm);
    if (phoneRegex.test(phone)) {
        // Generating a new OTP token for the user
        const tokenObj = (0, generateOtp_1.default)();
        // Storing the OTP token in the user's session for future verification.
        req.session.otp = `${tokenObj.otp},${phone}`;
        // Check if the user with the given phone number already exists in the database
        res.status(200).json({
            phone: phone,
            otp: tokenObj.otp,
        });
    }
    else {
        res.status(400);
        throw new Error("Nice Try!");
    }
});
exports.authorization = authorization;
// @desc  verify user
// @route POST /api/users/verify
// @access Public
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, otp } = req.body;
    if (otp && otp === req.session.otp.split(',')[0]) {
        const userExists = yield userModel_1.default.findOne({ phone });
        if (userExists) {
            res.status(200).json({ user: userExists, token: (0, generateToken_1.default)(userExists._id) });
        }
        else {
            const isRegisterd = false;
            res.status(200).json({ isRegisterd, phone, otp });
        }
    }
    else {
        res.status(400);
        throw new Error("Bugger offf");
    }
});
exports.verifyOTP = verifyOTP;
// @desc  verify user
// @route POST /api/users/verify
// @access Public
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, firstName, lastName, email, status, currentCredits, currentMinutes, currency, language, country, avatar, isVerified, otp, } = req.body;
    if (otp && otp === req.session.otp.split(',')[0]) {
        const newUser = yield userModel_1.default.create({
            phone,
            firstName,
            lastName,
            email,
            status,
            currentCredits,
            currentMinutes,
            currency,
            language,
            country,
            avatar,
            isVerified,
        });
        res.status(201).json({ user: newUser, token: (0, generateToken_1.default)(newUser._id) });
    }
    else {
        res.status(400).json('Authentication failed');
    }
});
exports.register = register;
