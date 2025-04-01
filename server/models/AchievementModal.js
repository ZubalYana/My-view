const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
    actionName: { type: String, required: true },
    repetitions: { type: Number, required: true },
    weekly: { type: Boolean },
    monthly: { type: Boolean },
    yearly: { type: Boolean },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Achievement', AchievementSchema);
