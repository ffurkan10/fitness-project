const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Nutrition = require("../models/nutritionModel")
const User = require("../models/userModel")

exports.createNutrition = catchAsync(async (req, res, next) => {
    const { userId, ...others } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError('Belirtilen kullanıcı bulunamadı.', 404));
    }

    const newNutrition = await Nutrition.create({
        ...others,
        userId
    });

    user.nutrition = newNutrition._id;
    await user.save({ validateBeforeSave: false }); //! passwordConfirm gibi alanlara takılmaması için

    res.status(201).json({
        status: 'success',
        data: {
            data: newNutrition
        }
    });
});

exports.getUserNutrition = async (req, res, next) => {
    console.log(req);
    
    const user = await User.findById(req.params.id).populate('nutrition');
    res.status(200).json({
        status: 'success',
        data: user.nutrition
    });
};

exports.updateNutrition = catchAsync(async (req, res, next) => {
    const updatedNutrition = await Nutrition.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedNutrition) {
        return next(new AppError('Üyelik bulunamadı.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            updatedNutrition
        }
    });
});

exports.deleteNutrition = catchAsync(async (req, res, next) => {
    const deletedNutrition = await Nutrition.findByIdAndDelete(req.params.id);
    if (!deletedNutrition) {
        return next(new AppError('Üyelik bulunamadı.', 404));
    }
    res.status(200).json({
        status: 'success',
        data: deletedNutrition
    });
});