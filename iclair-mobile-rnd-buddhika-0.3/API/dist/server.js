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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const coachRoutes_1 = __importDefault(require("./routes/coachRoutes"));
//twilio config
const twilio_1 = __importDefault(require("twilio"));
const accountSid = "ACcd31af34bbb4c46b9cfe5ba73591f47a";
const authToken = "8134a9d527fdfe838cb49f3e61181525";
const client = (0, twilio_1.default)(accountSid, authToken);
const app = (0, express_1.default)();
// Load environment variables from .env file
dotenv_1.default.config();
(0, db_1.default)();
app.use((0, morgan_1.default)("dev"));
// Use express.json to parse incoming request body as json
app.use(express_1.default.json());
// cors config
app.use((0, cors_1.default)());
//session config
const sessionSecret = process.env.SESSION_SECRET;
app.use((0, express_session_1.default)({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
}));
// define routes for the server
app.use("/api/users", userRoutes_1.default);
app.use("/api/coaches", coachRoutes_1.default);
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("wats up bro!");
}));
// Use the notFound middleware for 404 errors
app.use(errorMiddleware_1.notFound);
// Use the errorHandler middleware for other errors
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[server🤖]: Beep Boop Bop, I am Running at http://localhost:${PORT}⚡️`);
});
