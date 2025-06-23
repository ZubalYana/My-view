const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

router.post("/connect", async (req, res) => {
    const { userId, chatId } = req.body;
    if (!userId || !chatId) return res.status(400).json({ message: "Missing data" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.telegram = { chatId, isConnected: true };
    await user.save();

    res.status(200).json({ message: "Telegram connected" });
});

router.post("/disconnect", async (req, res) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.telegram = { chatId: null, isConnected: false };
    await user.save();

    res.status(200).json({ message: "Disconnected from Telegram" });
});

module.exports = router;
