const cron = require('node-cron');
const Membership = require('../models/membershipModel');

//! Her gün saat 00:01 de çalışsın

cron.schedule('1 0 * * *', async () => {
  try {
    const now = new Date();

    const result = await Membership.updateMany(
      { isActive: true, endDate: { $lt: now } },
      { isActive: false }
    );

    console.log(`[Süresi dolan üyelikler pasif hale getirildi. (${result.modifiedCount} güncellendi)`);
  } catch (err) {
    console.error('[Üyelik güncelleme hatası:', err);
  }
});
