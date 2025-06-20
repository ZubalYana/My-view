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
    }

});

module.exports = mongoose.model('User', UserSchema);
