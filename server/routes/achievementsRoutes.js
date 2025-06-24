const express = require("express");
const router = express.Router();
const AchievementModal = require("../models/AchievementModal");
const authenticateToken = require("../middleware/authMiddleware");
const updateUserStreak = require("../utils/updateStreak");

function isAchievementExpired(achievement) {
    const now = new Date();
    const created = new Date(achievement.createdAt);

    if (achievement.weekly) {
        const nextWeek = new Date(created);
        nextWeek.setDate(created.getDate() + 7);
        return now > nextWeek;
    }

    if (achievement.monthly) {
        const nextMonth = new Date(created);
        nextMonth.setMonth(created.getMonth() + 1);
        return now > nextMonth;
    }

    if (achievement.yearly) {
        const nextYear = new Date(created);
        nextYear.setFullYear(created.getFullYear() + 1);
        return now > nextYear;
    }

    return false;
}

router.post("/create-achievement", async (req, res) => {
    try {
        console.log(req.body);
        const {
            actionName,
            repetitions,
            weekly,
            monthly,
            yearly,
            userId,
            isRegular,
            tags,
            reminders,
        } = req.body;

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
            tags: Array.isArray(tags) ? tags : [],
            reminders: Array.isArray(reminders) ? reminders : [],
        });


        await newAchievement.save();
        res.status(201).json({ message: "Achievement created successfully", achievement: newAchievement });
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

router.patch("/update/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { completedRepetitions, reminders } = req.body;

        const achievement = await AchievementModal.findById(id);
        if (!achievement) {
            return res.status(404).json({ message: "Achievement not found" });
        }

        const diff = completedRepetitions - achievement.completedRepetitions;

        if (diff !== 0) {
            if (!achievement.achievementHistory) achievement.achievementHistory = [];

            achievement.achievementHistory.push({
                date: new Date(),
                count: diff,
            });

            await updateUserStreak(req.user.id);
        }

        achievement.completedRepetitions = Math.max(0, Math.min(completedRepetitions, achievement.repetitions));

        // ✅ Update reminders if sent
        if (Array.isArray(reminders)) {
            achievement.reminders = reminders;
        }

        await achievement.save();

        res.status(200).json({ message: "Achievement updated successfully", achievement });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.patch("/edit-achievement/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            actionName,
            repetitions,
            weekly,
            monthly,
            yearly,
            isRegular,
            tags,
            reminders
        } = req.body;

        const achievement = await AchievementModal.findById(id);
        if (!achievement) {
            return res.status(404).json({ message: "Achievement not found" });
        }

        if (actionName !== undefined) achievement.actionName = actionName;
        if (repetitions !== undefined) achievement.repetitions = repetitions;
        if (weekly !== undefined) achievement.weekly = weekly;
        if (monthly !== undefined) achievement.monthly = monthly;
        if (yearly !== undefined) achievement.yearly = yearly;
        if (isRegular !== undefined) achievement.isRegular = isRegular;
        if (tags !== undefined) achievement.tags = Array.isArray(tags) ? tags : [];
        if (reminders !== undefined) achievement.reminders = reminders;

        await achievement.save();
        res.status(200).json({ message: "Achievement updated successfully", achievement });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/delete-achievement/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const achievement = await AchievementModal.findByIdAndDelete(id);
        if (!achievement) {
            return res.status(404).json({ message: "Achievement not found" });
        }

        res.status(200).json({ message: "Achievement deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/achievements/cleanup", async (req, res) => {
    try {
        const achievements = await AchievementModal.find();

        const expiredIds = achievements
            .filter(isAchievementExpired)
            .map(a => a._id);

        await AchievementModal.deleteMany({ _id: { $in: expiredIds } });

        res.status(200).json({ message: "Expired achievements deleted", count: expiredIds.length });
    } catch (err) {
        res.status(500).json({ message: "Error deleting expired achievements" });
    }
});

router.get('/activity', authenticateToken, async (req, res) => {
    try {
        const achievements = await AchievementModal.find({ user: req.user.id });
        const allHistory = achievements.flatMap((a) => a.achievementHistory || []);
        res.json(allHistory);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching activity data' });
    }
});



module.exports = router;
