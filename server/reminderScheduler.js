require('dotenv').config();
const cron = require("node-cron");
const mongoose = require("mongoose");
const TelegramBot = require("node-telegram-bot-api");
const Achievement = require("./models/AchievementModal");
const User = require("./models/UserModel");

mongoose.connect(process.env.MONGODB_URI);

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

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
            try {
                await bot.sendMessage(
                    user.telegram.chatId,
                    `⏰ Reminder: Don't forget to ${achievement.actionName}!`
                );
                console.log("✅ Reminder sent");
            } catch (err) {
                console.error("❌ Failed to send message", err);
            }
        }
    }

});
