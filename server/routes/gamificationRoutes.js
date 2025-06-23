const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const authenticateToken = require('../middleware/authMiddleware');

function getXPForNextLevel(level) {
    return Math.floor(100 * level * 1.5);
}


router.patch("/xp", authenticateToken, async (req, res) => {
    try {
        const { XPToAdd } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).send("User not found");

        user.XP += XPToAdd;

        while (user.XP >= getXPForNextLevel(user.level)) {
            user.level += 1;
        }

        await user.save();
        res.status(200).json({ XP: user.XP, level: user.level });
    } catch (err) {
        res.status(500).json({ error: "Failed to update XP" });
    }
});

module.exports = router;