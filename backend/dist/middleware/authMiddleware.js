"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
const auth = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token)
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    try {
        const decoded = await jsonwebtoken_1.default.verify(token, process.env.jwtPrivateKey);
        req.user = await userModel_1.User.findById(decoded.id).select("-password");
        next();
    }
    catch (err) {
        return res.status(400).json({ message: "Invalid token." });
    }
};
exports.auth = auth;
