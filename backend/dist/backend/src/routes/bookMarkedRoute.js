"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userModel_1 = require("../../../model/userModel");
const authMiddleware_1 = require("../middleware/authMiddleware");
const entertainmentModel_1 = require("../../../model/entertainmentModel");
const router = (0, express_1.Router)();
// ADD MOVIE OR TV SERIES TO THE USER BOOKMARKED
router.post("/:id", authMiddleware_1.auth, async (req, res) => {
    const entertainment = await entertainmentModel_1.Entertainment.findById(req.params.id);
    const user = req.user;
    if (entertainment.category === "Movie") {
        // ADD MOVIE TO THE USER BOOKMARKED
        user.bookMarkedMovies.push({
            entertainment: req.params.id,
        });
    }
    else {
        //ADD TV SERIES TO THE USER BOOKMARKED
        user.bookMarkedTvSeries.push({
            entertainment: req.params.id,
        });
    }
    // SAVE IT IN THE DATABASE
    user.save();
    // SEND USER OBJECT
    res.status(201).json(req.user);
});
// GET BOOKMARKED USER MOVIES
router.get("/movies", authMiddleware_1.auth, async (req, res) => {
    // GET AUTHENTICATED USER
    const user = await userModel_1.User.findById(req.user._id)
        // GET ALL BOOKMARKED MOVIES OBJECTS
        .populate("bookMarkedMovies.entertainment")
        // SELECT BOOKMARKED MOVIES ARRAY FROM USER OBJECT
        .select("bookMarkedMovies");
    // SEND USER BOOKMARKED MOVIES ARRAY
    res.status(200).json(user);
});
// GET BOOKMARKED USER TV SERIES
router.get("/tvseries", authMiddleware_1.auth, async (req, res) => {
    // GET AUTHENTICATED USER
    const user = await userModel_1.User.findById(req.user._id)
        // GET ALL BOOKMARKED TV SERIES OBJECTS
        .populate("bookMarkedTvSeries.entertainment")
        // SELECT BOOKMARKED TV SERIES ARRAY FROM USER OBJECT
        .select("bookMarkedTvSeries");
    // SEND USER BOOKMARKED TV SERIES ARRAY
    res.status(200).json(user);
});
// REMOVE BOOKMARKED MOVIE OR TV SERIES FROM USER BOOKMARKED
router.delete("/:id", authMiddleware_1.auth, async (req, res) => {
    // UPDATE USER OBJECT BY PULLING THE THE MOVIE WITH GIVEN ID FROM USER BOOKMARKED ARRAY
    const entertainment = await entertainmentModel_1.Entertainment.findById(req.params.id);
    if (entertainment.category === "Movie") {
        // DELETE BOOKMARKED MOVIE FROM USER
        const user = await userModel_1.User.findByIdAndUpdate(req.user._id, {
            $pull: { bookMarkedMovies: { entertainment: req.params.id } },
        }).select("-password");
        // SEND THE RESULT
        res.status(200).json(user);
    }
    else {
        const user = await userModel_1.User.findByIdAndUpdate(req.user._id, {
            $pull: { bookMarkedTvSeries: { entertainment: req.params.id } },
        }).select("-password");
        // SEND THE RESULT
        res.status(200).json(user);
    }
});
exports.default = router;
