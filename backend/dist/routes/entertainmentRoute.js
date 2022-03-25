"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const entertainmentModel_1 = require("../model/entertainmentModel");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const all = await entertainmentModel_1.Entertainment.find();
    res.send(all);
});
exports.default = router;
