"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userModel_1 = require("../model/userModel");
const authMiddleware_1 = require("./../middleware/authMiddleware");
const router = (0, express_1.Router)();
// ADD MOVIE OR TV SERIES TO THE USER BOOKMARKED
router.post("/:id", authMiddleware_1.auth, async (req, res) => {
    // GET AUTHENTICATED USER
    const user = await userModel_1.User.findById(req.user._id).select("-password");
    // PUSH MOVIE OR TV SERIES TO THE USER BOOKMARKED
    user.bookMarked.push({
        entertainment: req.params.id,
    });
    // SAVE IT IN THE DATABASE
    user.save();
    // SEND USER OBJECT
    res.json(user);
});
// GET ALL USER BOOKMARKED MOVIE AND TV SERIES
router.get("/", authMiddleware_1.auth, async (req, res) => {
    // GET AUTHENTICATED USER
    const user = await userModel_1.User.findById(req.user._id)
        // GET FULL BOOKMARKED OBJECTS
        .populate("bookMarked.entertainment")
        // SELECT BOOKMARKED ARRAY FROM USER OBJECT
        .select("bookMarked");
    // SEND USER BOOKMARKED ARRAY
    res.json(user);
});
// REMOVE BOOKMARKED MOVIE OR TV SERIES FROM USER BOOKMARKED
router.delete("/:id", authMiddleware_1.auth, async (req, res) => {
    // UPDATE USER OBJECT BY PULLING THE THE MOVIE WITH GIVEN ID FROM USER BOOKMARKED ARRAY
    const result = await userModel_1.User.updateOne({ _id: req.user._id }, {
        $pull: { bookMarked: { entertainment: req.params.id } },
    });
    // SEND THE RESULT
    res.json(result);
});
exports.default = router;
