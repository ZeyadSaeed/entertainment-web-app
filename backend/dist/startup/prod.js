"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
exports.default = (app) => {
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
