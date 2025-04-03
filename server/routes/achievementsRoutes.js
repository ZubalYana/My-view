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

router.get("/get-achievements", async (req, res) => {
    try {
        const achievements = await AchievementModal.find().populate("user").exec();
        res.status(200).json(achievements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.patch("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { completedRepetitions } = req.body;

        if (completedRepetitions < 0) {
            return res.status(400).json({ message: "Completed repetitions cannot be negative" });
        }

        const achievement = await AchievementModal.findById(id);
        if (!achievement) {
            return res.status(404).json({ message: "Achievement not found" });
        }

        achievement.completedRepetitions = Math.min(completedRepetitions, achievement.repetitions);

        await achievement.save();
        res.status(200).json({ message: "Achievement updated successfully", achievement });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;
