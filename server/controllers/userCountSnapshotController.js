const cron = require('node-cron');
const moment = require('moment');
const User = require('../models/userModel');
const Membership = require('../models/membershipModel');
const UserCountSnapshot = require('../models/userCountSnapshotModel');
const catchAsync = require('../utils/catchAsync');

const takeMonthlyUserSnapshot = async () => {
  try {
    const monthKey = moment().format('DD-MM-YYYY'); 

    const totalUsers = await User.countDocuments();
    const activeMemberships = await Membership.countDocuments({ isActive: true });
    const memberships = await Membership.find({ isActive: true });

    let totalRevenue = 0;
    let personalTrainingCount = 0;
    let groupTrainingCount = 0;
    let timeOutMembership = 0;

    memberships.forEach(m => {
      const price = parseFloat(m.price);
      if (!isNaN(price)) totalRevenue += price;

      const type = m.courseType;
      if (type === 1 ) personalTrainingCount++;
      else if (type === 2 ) groupTrainingCount++;
    });

    // Üyeliğin bitmesine 1 hafta kalanları say
    const oneWeekFromNow = moment().add(7, 'days').toDate();
    timeOutMembership = await Membership.countDocuments({
      isActive: true,
      endDate: { $lte: oneWeekFromNow }
    });


    // Upsert: varsa güncelle, yoksa oluştur
    await UserCountSnapshot.findOneAndUpdate(
      { month: monthKey },
      {
        totalUsers,
        activeMemberships,
        totalRevenue,
        personalTrainingCount,
        groupTrainingCount,
        timeOutMembership,
        createdAt: new Date()
      },
      { upsert: true, new: true }
    );

    console.log(`[✔] ${monthKey} snapshot güncellendi/alındı.`);
  } catch (err) {
    console.error('[X] Snapshot alma hatası:', err);
  }
};


//! Her ayın 1'inde 00:05'te çalışır
cron.schedule('5 0 1 * *', takeMonthlyUserSnapshot);
//! Her gün saat 00:05'te çalışır
// cron.schedule('5 0 * * *', takeMonthlyUserSnapshot);
//! her dakika çalışır (test için)
// cron.schedule('* * * * *', takeMonthlyUserSnapshot); 


exports.getMonthlyStats = catchAsync(async (req, res, next) => {
    const data = await UserCountSnapshot.find().sort({ month: 1 });

    res.status(200).json({
        status: 'success',
        data
    });
});
