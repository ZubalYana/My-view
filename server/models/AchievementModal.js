const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
    actionName: { type: String, required: true },
    repetitions: { type: Number, required: true, min: 1 },
    completedRepetitions: { type: Number, default: 0 },
    weekly: { type: Boolean, default: false },
    monthly: { type: Boolean, default: false },
    yearly: { type: Boolean, default: false },
    isRegular: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    achievementHistory: [
        {
            date: { type: Date, default: Date.now },
            count: { type: Number, default: 1 },
        }
    ],
    tags: { type: Array, default: [] },

    reminders: {
        type: [
            {
                day: {
                    type: String,
                    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    required: true,
                },
                time: {
                    type: String,
                    required: true,
                }
            }
        ],
        default: []
    }
});

module.exports = mongoose.model("Achievement", AchievementSchema);
