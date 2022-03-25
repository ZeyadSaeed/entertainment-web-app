"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./startup/routes"));
const logging_1 = __importDefault(require("./startup/logging"));
const config_1 = __importDefault(require("./startup/config"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, logging_1.default)();
(0, routes_1.default)(app);
(0, db_1.default)();
(0, config_1.default)();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running in port ${port}`);
});
