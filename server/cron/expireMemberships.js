const cron = require('node-cron');
const Membership = require('../models/membershipModel');
const User = require('../models/userModel');

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

//! 2. çözüm
// cron.schedule('1 0 * * *', async () => {
//   console.log('[CRON] expireMemberships.js yüklendi!');

//   try {
//     const now = new Date();
//     const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

//     console.log(`[🔄 ${new Date().toLocaleString()}] Cron tetiklendi`);

//     const result = await Membership.updateMany(
//       { isActive: true, endDate: { $lt: todayStart } },
//       { isActive: false }
//     );

//     console.log(`[✔️ Cron] ${result.modifiedCount} üyelik güncellendi.`);
//   } catch (err) {
//     console.error('[❌ Cron Hata]:', err);
//   }
// });
console.log('✅ expireMemberships.js çağrıldı');
//! 3. çözüm


cron.schedule('5 0 * * *', async () => {
  console.log('[CRON] expireMemberships.js yüklendi!');

  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    console.log(`[🔄 ${new Date().toLocaleString()}] Cron tetiklendi`);

    //! Süresi dolmuş üyelikleri bul
    const expiredMemberships = await Membership.find({
      isActive: true,
      endDate: { $lt: todayStart }
    });

    const expiredIds = expiredMemberships.map(m => m._id);

    //! 1️⃣ Üyelikleri pasif yap
    const result = await Membership.updateMany(
      { _id: { $in: expiredIds } },
      { isActive: false }
    );

    //! 2️⃣ Kullanıcılardan bu üyelik bağlantılarını kaldır
    const userResult = await User.updateMany(
      { membership: { $in: expiredIds } },
      { $unset: { membership: 1 } }
    );

    console.log(`[✔️ Cron] ${result.modifiedCount} üyelik pasife alındı.`);
    console.log(`[✔️ Cron] ${userResult.modifiedCount} kullanıcıdan membership bağlantısı silindi.`);

  } catch (err) {
    console.error('[❌ Cron Hata]:', err);
  }
});
