const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const LessonSession = require("../models/lessonSessionModel");
const User = require("../models/userModel");

exports.createLesson = catchAsync(async (req, res, next) => {
  const { userId, date, time } = req.body;

  // 1. Önce çakışmayı kontrol et
  const existing = await LessonSession.findOne({
    date,
    time,
    status: { $in: ['scheduled', 'postponed'] }
  });

  if (existing) {
    return next(new AppError('Belirtilen tarih ve saatte başka bir ders mevcut!', 400));
  }

  // 2. Ders oluştur
  const newLesson = await LessonSession.create({ userId, date, time });

  // 3. İsteğe bağlı: user'a push et
  // await User.findByIdAndUpdate(userId, { $push: { lessonSessions: newLesson._id } });

  res.status(201).json({ status: 'success', data: newLesson });
});


exports.getUserLessons = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  console.log("Fetching lessons for user ID:", req.params);
  

  const lessons = await LessonSession.find({ userId: id }).sort({ date: 1 });

  res.status(200).json({ status: 'success', data: lessons });
});

// exports.updateLesson = catchAsync(async (req, res, next) => {
//     const { id } = req.params;
//     const updatedLesson = await LessonSession.findByIdAndUpdate(id, req.body, {
//         new: true,
//         runValidators: true
//     });

//     if (!updatedLesson) {
//         return next(new AppError('Ders bulunamadı.', 404));
//     }

//     res.status(200).json({ status: 'success', data: updatedLesson });
// });

//! eğer ders tamamlandı veya iptal edildiyse kalan dersi eksiltme
exports.updateLesson = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  
  console.log("Updating lesson ID:", id, "with data:", req.body);
  
  //? Önce dersi güncelle
  const updatedLesson = await LessonSession.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updatedLesson) {
    return next(new AppError('Ders bulunamadı.', 404));
  }

  //? Eğer status completed veya missed olarak güncellendiyse, ders hakkından 1 düş
  if (['completed', 'missed'].includes(status)) {
    console.log("Ders durumu tamamlandı veya kaçırıldı, kalan ders hakkı düşülüyor.");
    
    const user = await User.findById(updatedLesson.userId).populate('membership');
    console.log("Kullanıcı ve üyelik bilgisi:", user, user ? user.membership : null);
    if (!user || !user.membership) {
      return next(new AppError('Kullanıcı veya üyelik bilgisi bulunamadı.', 404));
    }

    const membership = user.membership;

    //? Sıfırın altına inmesini engelle
    if (membership.remainingCourse > 0) {
      membership.remainingCourse -= 1;
      await membership.save();
    }
  }

  res.status(200).json({
    status: 'success',
    data: updatedLesson
  });
});

exports.deleteLesson = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedLesson = await LessonSession.findByIdAndDelete(id);

    if (deletedLesson) {
        await User.findByIdAndUpdate(deletedLesson.userId, {
            $pull: { lessonSessions: deletedLesson._id }
        });
    }

    if (!deletedLesson) {
        return next(new AppError('Ders bulunamadı.', 404));
    }

    res.status(204).json({ status: 'success', data: null });
});


exports.getOccupiedSlots = async (req, res) => {
  const date = new Date(req.query.date);
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);

  const lessons = await LessonSession.find({
    date: { $gte: date, $lt: nextDay },
    status: { $in: ['scheduled', 'postponed'] }
  });

  const occupiedTimes = lessons.map(l => l.time);

  res.status(200).json({ success: true, data: occupiedTimes });
};
