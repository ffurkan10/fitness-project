const mongoose = require('mongoose');

const userCountSnapshotSchema = new mongoose.Schema({
    month: {
        type: String, // "2025-07" gibi
        required: true,
        unique: true
    },
    totalUsers: {
        type: Number,
        required: true
    },
    activeMemberships: {
        type: Number,
        required: true
    },
    totalRevenue: {
        type: Number,
        required: true
    },
    personalTrainingCount: {
        type: Number,
        required: true
    },
    groupTrainingCount: {
        type: Number,
        required: true
    },
    timeOutMembership: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserCountSnapshot = mongoose.model('UserCountSnapshot', userCountSnapshotSchema);
module.exports = UserCountSnapshot;
