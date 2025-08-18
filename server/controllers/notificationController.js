const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Notification = require("../models/notificationModel")
const User = require("../models/userModel");
const { getIO } = require("../socket");

exports.createNotification = catchAsync(async (req, res, next) => {
  const { title, message, userId, isGlobal } = req.body;

    const notification = await Notification.create({
        title,
        message,
        user: isGlobal ? null : userId,
        isGlobal
    });

    const io = getIO();

    if (isGlobal) {
        console.log(`Global notification sent: ${title}`);
        
        io.emit("newNotification", {
            title,
            message,
            isGlobal: true
        });

        const usersWithToken = await User.find({ pushToken: { $exists: true, $ne: null } });
        for (const user of usersWithToken) {
            await sendPushNotification(user.pushToken, title, message);
        }

    } else {
        console.log(`Notification sent to user ${userId}: ${title}`);
        io.to(userId).emit("newNotification", {
            title,
            message,
            isGlobal: false
        });

        const user = await User.findById(userId);
        if (user?.pushToken) {
            await sendPushNotification(user.pushToken, title, message);
        }
    }

    res.status(201).json({
        status: 'success',
        data: { notification }
    });
});


exports.getAllNotifications = catchAsync(async (req, res, next) => {
    const notifications = await Notification.find().sort({ createdAt: -1 }).populate('user', 'name');

    if (!notifications || notifications.length === 0) {
        return next(new AppError('Bildirim bulunamadı.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            notifications
        }
    });
})

exports.getUserNotifications = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    const notifications = await Notification.find({
        $or: [
            { isGlobal: true },
            { user: userId }
        ]
    }).sort({ createdAt: -1 });

    //! Okunma bilgisi ekle
    const formatted = notifications.map(n => ({
        _id: n._id,
        title: n.title,
        message: n.message,
        isGlobal: n.isGlobal,
        createdAt: n.createdAt,
        isReaded: n.isReadedBy.includes(userId)
    }));

    res.status(200).json({
        status: 'success',
        data: {
            notifications: formatted
        }
    });
});

exports.markNotificationAsRead = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const notificationId = req.params.id;

    console.log(`Marking notification ${notificationId} as read for user ${userId}`);
    

    const notification = await Notification.findById(notificationId);
    if (!notification) {
        return next(new AppError('Bildirim bulunamadı.', 404));
    }

    //! Zaten okunduysa tekrar ekleme
    if (!notification.isReadedBy.includes(userId)) {
        notification.isReadedBy.push(userId);
        await notification.save();
    }

    res.status(200).json({
        status: 'success',
        message: 'Bildirim okundu olarak işaretlendi.',
        data: {
            notification
        }
    });
});


