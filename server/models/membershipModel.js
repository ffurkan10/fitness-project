const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    packageType: {
        type: Number,
    },
    remainingCourse: {
        type: String,
    },
    courseType: {
        type: Number, // örneğin 1: birebir, 2: grup
        enum: [1, 2],
    },
    price: {
        type: String
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
    },
    startDate: Date,
    endDate: Date,
}, { timestamps: true });

const Membership = mongoose.model('Membership', membershipSchema);
module.exports = Membership;