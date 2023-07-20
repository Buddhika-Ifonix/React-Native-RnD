"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coachController_1 = require("../controllers/coachController");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authMiddleware_1 = require("../middleware/authMiddleware");
// Create a new Express router
const router = express_1.default.Router();
router.get('/', authMiddleware_1.protect, (0, express_async_handler_1.default)(coachController_1.getCoaches));
exports.default = router;
