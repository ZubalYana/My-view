const cron = require('node-cron');
const TelegramBot = require("node-telegram-bot-api");
const User = require("./models/UserModel");
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const Achievement = require("./models/AchievementModal");

bot.onText(/\/start (.+)/, async (msg, match) => {
    const userId = match[1];
    const chatId = msg.chat.id;
    console.log("Bot received /start with match:", match, "and chatId:", chatId, "and userId:", userId);

    try {
        const user = await User.findById(userId);
        if (!user) return bot.sendMessage(chatId, "User not found.");

        user.telegram = {
            chatId,
            isConnected: true,
        };
        await user.save();

        bot.sendMessage(chatId, "✅ You've successfully connected your Telegram!");
    } catch (err) {
        console.error(err);
        bot.sendMessage(chatId, "❌ Failed to connect your Telegram. Please try again.");
    }
});