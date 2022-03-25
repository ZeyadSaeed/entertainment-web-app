"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    if (!process.env.jwtPrivateKey) {
        throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
    }
};
