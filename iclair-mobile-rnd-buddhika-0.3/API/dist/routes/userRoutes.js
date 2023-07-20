"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// Create a new Express router
const router = express_1.default.Router();
// register a new user
router.post('/', (0, express_async_handler_1.default)(userController_1.register));
router.post('/auth', (0, express_async_handler_1.default)(userController_1.authorization));
router.post('/verify', (0, express_async_handler_1.default)(userController_1.verifyOTP));
exports.default = router;
