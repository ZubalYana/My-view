const User = require("../models/UserModel");

const updateUserStreak = async (userId) => {
    const user = await User.findById(userId);
    if (!user) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastUpdated = user.streak?.lastUpdated
        ? new Date(user.streak.lastUpdated).setHours(0, 0, 0, 0)
        : null;

    if (lastUpdated === today.getTime()) return;

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastUpdated === yesterday.getTime()) {
        user.streak.current += 1;
    } else {
        user.streak.current = 1;
    }

    user.streak.lastUpdated = new Date();
    user.streak.longest = Math.max(user.streak.current, user.streak.longest || 0);

    await user.save();
};

module.exports = updateUserStreak;
