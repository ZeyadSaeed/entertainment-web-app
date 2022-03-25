"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.All = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const trendingSchema = new mongoose_1.default.Schema({
    small: String,
    large: String,
});
const regularSchema = new mongoose_1.default.Schema({
    small: { type: String, required: true },
    medium: { type: String, required: true },
    large: { type: String, required: true },
});
const allSchema = new mongoose_1.default.Schema({
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
exports.All = mongoose_1.default.model("All", allSchema);
