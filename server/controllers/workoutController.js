const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Workout = require("../models/workoutModel")
const User = require("../models/userModel")

exports.createWorkout = catchAsync(async (req, res, next) => {
    const { userId, ...others } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError('Belirtilen kullanıcı bulunamadı.', 404));
    }

    const newWorkout = await Workout.create({
        ...others,
        userId
    });

    user.workouts = newWorkout._id;
    await user.save({ validateBeforeSave: false }); //! passwordConfirm gibi alanlara takılmaması için

    res.status(201).json({
        status: 'success',
        data: newWorkout
    });
});

exports.getUserNutrition = async (req, res, next) => {
    console.log(req);
    
    const user = await User.findById(req.params.id).populate('workouts');
    res.status(200).json({
        status: 'success',
        data: user.workouts
    });
};

exports.updateWorkout = catchAsync(async (req, res, next) => {
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedWorkout) {
        return next(new AppError('Üyelik bulunamadı.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            updatedWorkout
        }
    });
});

exports.deleteWorkout = catchAsync(async (req, res, next) => {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
    if (!deletedWorkout) {
        return next(new AppError('Üyelik bulunamadı.', 404));
    }
    res.status(200).json({
        status: 'success',
        data: deletedWorkout
    });
});