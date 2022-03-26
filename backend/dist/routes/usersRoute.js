"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LIBRARIES
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
const express_1 = require("express");
// MODELS
const userModel_1 = require("../model/userModel");
// MIDDLEWARE
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
const complexityOptions = {
    min: 8,
    max: 26,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
};
router.get("/me", authMiddleware_1.auth, async (req, res) => {
    // SEND USER OBJECT
    res.status(200).send(req.user);
});
router.post("/", async (req, res) => {
    // CHECK IF THE USER INPUT WRONG INFO
    const { error } = (0, userModel_1.validateUser)(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    // CHECK IF THE USER INPUT TWO PASSWORDS DON'T MATCH
    if (req.body.password !== req.body.repeatPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    // CHECK IF THE USER INPUT WEAK PASSWORD
    const password = (0, joi_password_complexity_1.default)(complexityOptions).validate(req.body.password);
    if (password.error)
        return res
            .status(400)
            .json({ message: password.error.details[0].message });
    // CHECK IF THE USER IS ALREADY EXIST
    let user = await userModel_1.User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).json({ message: "User already registered." });
    // CREATE A NEW USER
    user = new userModel_1.User({
        email: req.body.email,
        password: req.body.password,
    });
    // HASH THE PASSWORD
    const salt = await bcrypt_1.default.genSalt(10);
    user.password = await bcrypt_1.default.hash(user.password, salt);
    await user.save();
    // GENERATE TOKEN
    const token = user.generateAuthToken();
    res.json({ token });
});
exports.default = router;
