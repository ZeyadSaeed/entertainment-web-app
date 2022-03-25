"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const showModel_1 = require("../model/showModel");
const authMiddleware_1 = require("../middleware/authMiddleware");
const userModel_1 = require("../model/userModel");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.auth, async (req, res) => {
    // SEARCH FOR ALL MOVIES AND TV SERIES
    const searchResult = await showModel_1.Show.find({
        title: { $regex: req.body.search, $options: "i" },
    });
    // SEND SEARCH RESULT
    res.status(200).json(searchResult);
});
router.post("/movies", authMiddleware_1.auth, async (req, res) => {
    // SEARCH FOR ALL MOVIES
    const searchResult = await showModel_1.Show.find({
        title: { $regex: req.body.search, $options: "i" },
        category: "Movie",
    });
    // SEND SEARCH RESULT
    res.status(200).json(searchResult);
});
router.post("/tvseries", authMiddleware_1.auth, async (req, res) => {
    // SEARCH FOR ALL TV SERIES
    const searchResult = await showModel_1.Show.find({
        title: { $regex: req.body.search, $options: "i" },
        category: "TV Series",
    });
    // SEND SEARCH RESULT
    res.status(200).json(searchResult);
});
router.post("/bookmark", authMiddleware_1.auth, async (req, res) => {
    // SEARCH FOR ALL TV SERIES
    const searchResults = await userModel_1.User.findById(req.user._id)
        // GET THE BOOKMARKED OBJECTS THE EQUAL TO SEARCH RESULT
        .populate({
        path: "bookMarkedMovies.show bookMarkedTvSeries.show",
        match: {
            title: { $regex: req.body.search, $options: "i" },
        },
    })
        // SELECT ONLY BOOKMARKED MOVIES AND TV SERIES
        .select("bookMarkedMovies bookMarkedTvSeries -_id");
    // ADD ALL TO BOOKMARKED MOVIES AND TV SERIES TO ONE ARRAY
    const results = [
        ...searchResults.bookMarkedMovies,
        ...searchResults.bookMarkedTvSeries,
        // SHOW ONLY SHOW OBJECT FOR EACH BOOKMARKED SHOW
    ].map((result) => result.show);
    // SEND SEARCH RESULT
    res.status(200).json(results);
});
exports.default = router;
