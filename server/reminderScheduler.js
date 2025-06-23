require('dotenv').config();
const cron = require("node-cron");
const mongoose = require("mongoose");
const TelegramBot = require("node-telegram-bot-api");
const Achievement = require("./models/AchievementModal");
const User = require("./models/UserModel");

mongoose.connect(process.env.MONGODB_URI);

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

function getRandomReminderMessage(achievement) {
    const name = achievement.actionName;
    const remaining = achievement.repetitions - (achievement.completedRepetitions || 0);

    const messages = [
        `⏰ Reminder: Don't forget about your "${name}" achievement! Let's do it! 💪`,
        `⏳ Time flies! How about working on your "${name}" achievement now? ⏱️`,
        `🌟 You're getting close! Just ${remaining} more to complete "${name}"! Keep going! 🙌`,
        `🚀 Hey, champion! It's a great moment to knock out some "${name}" progress!`,
        `👀 "${name}" is still waiting! Don’t let the day slip away without taking action!`,
        `🔥 Only ${remaining} more "${name}" left to go! You’ve got this!`,
        `💡 Quick reminder: "${name}" is one step closer every time you act. Let’s move!`,
        `🎯 Stay on target! Time to work on your "${name}" achievement.`,
        `👏 You’re doing amazing! Let’s not forget "${name}" today!`
    ];

    return messages[Math.floor(Math.random() * messages.length)];
}

cron.schedule("* * * * *", async () => {
    const now = new Date();
    const dayOfWeek = now.toLocaleString("en-US", { weekday: "long" });
    const timeString = now.toTimeString().slice(0, 5);

    console.log(`⏰ Checking reminders at ${dayOfWeek} ${timeString}`);

    const achievementsDue = await Achievement.find({
        "reminders.day": dayOfWeek,
        "reminders.time": timeString,
    }).populate("user");

    for (const achievement of achievementsDue) {
        const user = achievement.user;

        console.log("Checking user:", user?.telegram);

        if (user?.telegram?.isConnected && user.telegram.chatId) {
            const message = getRandomReminderMessage(achievement);
            try {
                await bot.sendMessage(user.telegram.chatId, message);
                console.log("✅ Reminder sent");
            } catch (err) {
                console.error("❌ Failed to send message", err);
            }
        }
    }
});
