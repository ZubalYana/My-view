const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
    actionName: { type: String, required: true },
    repetitions: { type: Number, required: true, min: 1 },
    weekly: { type: Boolean, default: false },
    monthly: { type: Boolean, default: false },
    yearly: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Achievement", AchievementSchema);
