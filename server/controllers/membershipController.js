const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Membership = require("../models/membershipModel")
const User = require("../models/userModel")

exports.createMembership = catchAsync(async (req, res, next) => {
    const { userId, ...others } = req.body;

    console.log("Membership creation request body:", req.body);

    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError('Belirtilen kullanıcı bulunamadı.', 404));
    }

    const newMembership = await Membership.create({
        ...others,
        userId
    });

    //! Kullanıcıya bu membershipi bağla
    user.membership = newMembership._id;
    await user.save({ validateBeforeSave: false }); //! passwordConfirm gibi alanlara takılmaması için

    res.status(201).json({
        status: 'success',
        ata: newMembership
    });
});

exports.getUserMembership = async (req, res, next) => {
    console.log(req);
    
    const user = await User.findById(req.params.id).populate('membership');
    res.status(200).json({
        status: 'success',
        data: user.membership
    });
};

exports.updateMembership = catchAsync(async (req, res, next) => {
    const updatedMembership = await Membership.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedMembership) {
        return next(new AppError('Üyelik bulunamadı.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            updatedMembership
        }
    });
});

exports.deleteMembership = catchAsync(async (req, res, next) => {
    const deletedMembership = await Membership.findByIdAndDelete(req.params.id);
    if (!deletedMembership) {
        return next(new AppError('Üyelik bulunamadı.', 404));
    }
    res.status(200).json({
        status: 'success',
        data: deletedMembership
    });
});