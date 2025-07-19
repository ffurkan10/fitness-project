const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const BodyFeatures = require("../models/bodyFeaturesModel")
const User = require("../models/userModel")

exports.createBodyFeatures = catchAsync(async (req, res, next) => {
    const { userId, ...others } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError('Belirtilen kullanıcı bulunamadı.', 404));
    }

    const newBodyFeatures = await BodyFeatures.create({
        ...others,
        userId
    });

    user.bodyFeatures = newBodyFeatures._id;
    await user.save({ validateBeforeSave: false }); //! passwordConfirm gibi alanlara takılmaması için

    res.status(201).json({
        status: 'success',
        data: {
            newBodyFeatures
        }
    });
});

exports.getUserBodyFeatures = async (req, res, next) => {
    
    const user = await User.findById(req.params.id).populate('bodyFeatures');
    res.status(200).json({
        status: 'success',
        data: user.bodyFeatures
    });
};

exports.updateBodyFeatures = catchAsync(async (req, res, next) => {
    const updatedBodyFeatures = await BodyFeatures.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedBodyFeatures) {
        return next(new AppError('Üyelik bulunamadı.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            updatedBodyFeatures
        }
    });
});

exports.deleteBodyFeatures = catchAsync(async (req, res, next) => {
    const deletedBodyFeatures = await BodyFeatures.findByIdAndDelete(req.params.id);
    if (!deletedBodyFeatures) {
        return next(new AppError('Üyelik bulunamadı.', 404));
    }
    res.status(200).json({
        status: 'success',
        data: deletedBodyFeatures
    });
});