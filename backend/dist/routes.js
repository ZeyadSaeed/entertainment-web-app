"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usersRoute_1 = __importDefault(require("../routes/usersRoute"));
const authRoute_1 = __importDefault(require("../routes/authRoute"));
const entertainmentsRoute_1 = __importDefault(require("../routes/entertainmentsRoute"));
const moviesRoute_1 = __importDefault(require("../routes/moviesRoute"));
const tvSeries_1 = __importDefault(require("../routes/tvSeries"));
const trendingRoute_1 = __importDefault(require("../routes/trendingRoute"));
const bookMarked_1 = __importDefault(require("../routes/bookMarked"));
exports.default = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use("/api/users", usersRoute_1.default);
    app.use("/api/auth", authRoute_1.default);
    app.use("/api/all", entertainmentsRoute_1.default);
    app.use("/api/movies", moviesRoute_1.default);
    app.use("/api/tvSeries", tvSeries_1.default);
    app.use("/api/trending", trendingRoute_1.default);
    app.use("/api/bookMarked", bookMarked_1.default);
};
