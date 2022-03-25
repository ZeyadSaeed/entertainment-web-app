"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const showModel_1 = require("../model/showModel");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.auth, async (req, res) => {
    // GET TRENDING MOVIES AND TV SERIES
    const tending = await showModel_1.Show.find({
        isTrending: true,
    });
    // SEND TRENDING ARRAY
    res.status(200).json(tending);
});
exports.default = router;
