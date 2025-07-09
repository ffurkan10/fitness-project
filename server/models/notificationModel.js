const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Lütfen başlık giriniz.']
    },
    message: {
        type: String,
        required: [true, 'Lütfen mesaj giriniz.']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null //! global ise null
    },
    isGlobal: {
        type: Boolean,
        default: false
    },
    isReadedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
