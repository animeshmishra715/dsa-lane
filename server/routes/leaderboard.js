const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
    try {
        const users = await User.find()
            .sort({ reputation: -1 })
            .limit(10);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports=router;