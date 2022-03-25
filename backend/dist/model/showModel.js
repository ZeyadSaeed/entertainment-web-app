"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Show = void 0;
const mongoose_1 = require("mongoose");
// CREATE TRENDING SCHEMA
const trendingSchema = new mongoose_1.Schema({
    small: String,
    large: String,
});
// CREATE REGULAR SCHEMA
const regularSchema = new mongoose_1.Schema({
    small: { type: String, required: true },
    medium: { type: String, required: true },
    large: { type: String, required: true },
});
// CREATE SHOW SCHEMA
const showSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    thumbnail: {
        trending: trendingSchema,
        regular: regularSchema,
    },
    year: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    rating: String,
    isTrending: Boolean,
});
// SHOW SCHEMA
exports.Show = (0, mongoose_1.model)("Show", showSchema);
