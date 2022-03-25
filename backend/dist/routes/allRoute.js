"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const allModel_1 = require("../model/allModel");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const all = await allModel_1.All.find();
    console.log(Object.keys(mongoose_1.default.connection.collections));
});
exports.default = router;
