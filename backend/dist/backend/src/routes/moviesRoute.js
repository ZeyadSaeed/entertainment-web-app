"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const entertainmentModel_1 = require("../../../model/entertainmentModel");
const authMiddleware_1 = require("./../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.auth, async (req, res) => {
    // GET ALL MOVIES
    const movies = await entertainmentModel_1.Entertainment.find({
        category: "Movie",
    });
    // SEND MOVIES ARRAY
    res.status(200).json(movies);
});
exports.default = router;
