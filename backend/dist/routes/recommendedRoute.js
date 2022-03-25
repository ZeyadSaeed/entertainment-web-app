"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const showModel_1 = require("../model/showModel");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.auth, async (req, res) => {
    // GET ALL MOVIES AND TV SERIES
    const shows = await showModel_1.Show.find({
        isTrending: false,
    });
    // SEND MOVIES AND TV SERIES ARRAY
    res.status(200).json(shows);
});
exports.default = router;
