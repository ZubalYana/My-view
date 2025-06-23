const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    photo: { type: String, default: "", },
    streak: {
        current: { type: Number, default: 0 },
        lastUpdated: { type: Date },
        longest: { type: Number, default: 0 }
    },
    XP: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    achievementsCompleted: { type: Number, default: 0 },
    telegram: {
        chatId: { type: String },
        isConnected: { type: Boolean, default: false }
    }
});

module.exports = mongoose.model('User', UserSchema);
