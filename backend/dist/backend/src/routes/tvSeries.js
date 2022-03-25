"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const entertainmentModel_1 = require("../../../model/entertainmentModel");
const authMiddleware_1 = require("./../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.auth, async (req, res) => {
    // GET TV SERIES MOVIES AND TV SERIES
    const tvSeries = await entertainmentModel_1.Entertainment.find({
        category: "TV Series",
    });
    // SEND TV SERIES ARRAY
    res.status(200).json(tvSeries);
});
exports.default = router;
