"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = require("express");
const authModel_1 = require("../../../model/authModel");
const userModel_1 = require("../../../model/userModel");
const router = (0, express_1.Router)();
// AUTHENTICATE USER
router.post("/", async (req, res) => {
    // CHECK IF THE USER INPUT WRONG INFO
    const { error } = (0, authModel_1.validateAuth)(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    // CHECK IF THE USER NOT EXIST
    const user = await userModel_1.User.findOne({ email: req.body.email });
    console.log(user);
    // IF THERES EMAIL FOUND IN THE DATABASE WITH GIVEN ID SEND ERROR MESSAGE
    if (!user)
        return res.status(400).json({ message: "Invalid email or password." });
    // CHECK IF THE USER INPUT CORRECT PASSWORD
    const validPassword = await bcrypt_1.default.compare(req.body.password, user.password);
    // IF THE USER INPUT WRONG PASSWORD SEND ERROR MESSAGE
    if (!validPassword)
        return res.status(400).json({ message: "Invalid email or password." });
    // SEND JWT TOKEN
    const token = user.generateAuthToken();
    res.status(200).json({ token });
});
exports.default = router;
