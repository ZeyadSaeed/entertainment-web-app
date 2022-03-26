"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const path_1 = __importDefault(require("path"));
exports.default = (app) => {
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    if (process.env.NODE_ENV === "production") {
        app.use(express_1.default.static(path_1.default.join(__dirname, "../../../frontend/build")));
        app.get("*", (req, res) => {
            res.sendFile(path_1.default.resolve(__dirname, "../", "../", "../", "frontend", "build", "index.html"));
        });
    }
    else {
        app.get("/", (req, res) => res.send("App is not in production."));
    }
};
