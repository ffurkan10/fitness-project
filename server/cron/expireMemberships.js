const cron = require('node-cron');
const Membership = require('../models/membershipModel');

//! Her gün saat 00:01 de çalışsın

// cron.schedule('1 0 * * *', async () => {
//   try {
//     const now = new Date();

//     const result = await Membership.updateMany(
//       { isActive: true, endDate: { $lt: now } },
//       { isActive: false }
//     );

//     console.log(`[Süresi dolan üyelikler pasif hale getirildi. (${result.modifiedCount} güncellendi)`);
//   } catch (err) {
//     console.error('[Üyelik güncelleme hatası:', err);
//   }
// });

cron.schedule('1 0 * * *', async () => {
  console.log('[CRON] expireMemberships.js yüklendi!');

  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    console.log(`[🔄 ${new Date().toLocaleString()}] Cron tetiklendi`);

    const result = await Membership.updateMany(
      { isActive: true, endDate: { $lt: todayStart } },
      { isActive: false }
    );

    console.log(`[✔️ Cron] ${result.modifiedCount} üyelik güncellendi.`);
  } catch (err) {
    console.error('[❌ Cron Hata]:', err);
  }
});

