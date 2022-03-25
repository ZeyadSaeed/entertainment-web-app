"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.User = exports.userSchema = void 0;
const joi_oid_1 = __importDefault(require("joi-oid"));
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// CREATE USER SCHEMA
exports.userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
    bookMarkedMovies: [
        {
            show: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "Show",
            },
        },
    ],
    bookMarkedTvSeries: [
        {
            show: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "Show",
            },
        },
    ],
}, {
    timestamps: true,
});
// ADD METHOD TO USER SCHEMA TO GENERATE NEW AUTH TOKEN
exports.userSchema.methods.generateAuthToken = function () {
    const token = jsonwebtoken_1.default.sign({ id: this._id }, process.env.jwtPrivateKey);
    return token;
};
// USER MODEL
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
// CHECK IF THE USER INPUT CORRECT INFO TO CREATE AN ACCOUNT
const validateUser = (user) => {
    const schema = joi_oid_1.default.object({
        email: joi_oid_1.default.string().min(5).max(255).required().email(),
        password: joi_oid_1.default.string().min(8).max(255).required(),
        repeatPassword: joi_oid_1.default.string().min(8).max(255).required(),
    });
    return schema.validate(user);
};
exports.validateUser = validateUser;
