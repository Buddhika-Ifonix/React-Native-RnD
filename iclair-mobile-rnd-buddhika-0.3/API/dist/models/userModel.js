"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Create a new Mongoose schema for a user
const userSchema = new mongoose_1.Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Number,
        required: true,
        default: 0
    },
    currentCredits: {
        type: Number,
        required: true,
        default: 0,
    },
    currentMinutes: {
        type: Number,
        required: true,
        default: 0,
    },
    currency: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});
// This creates users doucment in mongodb
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
