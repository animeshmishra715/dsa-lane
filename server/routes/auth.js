const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { getAverageRating } = require("../utils/fetchRatings");
const getLevel = require("../utils/level");

//SIGNUP
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password, codeforcesHandle, leetcodeUsername } = req.body;

        // Check if a user with the same email OR username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            const field = existingUser.email === email ? "Email" : "Username";
            return res.status(409).json({ error: `${field} is already in use` });
        }

        // Fetch ratings from Codeforces + LeetCode and compute average
        const avgRating = await getAverageRating(codeforcesHandle || "", leetcodeUsername || "");
        const level = getLevel(avgRating);

        console.log(`Signup — avg rating: ${avgRating}, level: ${level}`);

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            codeforcesHandle: codeforcesHandle || "",
            leetcodeUsername: leetcodeUsername || "",
            rating: avgRating,
            level
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "User Created",
            token,
            username: user.username,
            level: user.level,
            rating: user.rating
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});



//LOGIN
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(400).json({ error: "User not found" });
            }
            bcrypt.compare(password, user.password)
                .then((match) => {
                    if (!match) {
                        return res.status(400).json({ error: "Incorrect password" });
                    }
                    const token = jwt.sign(
                        { id: user._id, username: user.username },
                        process.env.JWT_SECRET,
                        { expiresIn: "1h" }
                    );
                    res.json({
                        message: "Login successful",
                        token,
                        username: user.username,
                        level: user.level
                    });

                });

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Server error" });
        });

})
module.exports = router;






