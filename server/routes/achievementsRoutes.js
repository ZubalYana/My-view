const express = require("express");
const router = express.Router();
const AchievementModal = require("../models/AchievementModal");

router.post("/create-achievement", async (req, res) => {
    try {
        console.log(req.body);
        const { actionName, repetitions, weekly, monthly, yearly, userId, isRegular } = req.body;

        if (!actionName || !repetitions || (!weekly && !monthly && !yearly)) {
            return res.status(400).json({ message: "Invalid data" });
        }

        const newAchievement = new AchievementModal({
            actionName,
            repetitions,
            weekly,
            monthly,
            yearly,
            isRegular: !!isRegular,
            user: userId,
        });

        await newAchievement.save();
        res.status(201).json({ message: "Achievement created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
