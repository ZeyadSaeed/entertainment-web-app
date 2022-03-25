"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = void 0;
const joi_oid_1 = __importDefault(require("joi-oid"));
// CHECK IF THE USER INPUT CORRECT INFO TO AUTHENTICATE
const validateAuth = (req) => {
    const schema = joi_oid_1.default.object({
        email: joi_oid_1.default.string().min(5).max(255).required().email(),
        password: joi_oid_1.default.string().min(8).max(255).required(),
    });
    return schema.validate(req);
};
exports.validateAuth = validateAuth;
