"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authModel_1 = require("../model/authModel");
const userModel_1 = require("../model/userModel");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const { error } = (0, authModel_1.validateAuth)(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    const user = userModel_1.User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json({ message: "Invalid email or password." });
});
exports.default = router;
