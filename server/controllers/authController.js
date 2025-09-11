const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id, role) => {
    return jwt.sign({ id: id, role: role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        gender: req.body.gender
    });

    const token = signToken(newUser._id, "user");

    res.status(201).json({
        status: 'success',
        token,
        data: {
            newUser,
        },
    });
})


exports.login = catchAsync(async (req, res, next) => {
    const { phoneNumber, password } = req.body;

    if(!phoneNumber || !password) {
        return next(new AppError('Please provide phoneNumber and password', 400));
    }

    const user = await User.findOne({ phoneNumber}).select("+password");

    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect phoneNumber or password', 401));
    }

    const token = signToken(user._id, "user");

    res.status(200).json({
        status: 'success',
        token,
    })
})

exports.userInformation = catchAsync(async (req, res, next) => {
    
    const user = await User.findById(req.user.id).select("-password").populate("workouts").populate("nutrition", "totalKcal");
    if(!user) {
        return next(new AppError('No user found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
})

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const { name } = req.query;

  const queryObj = {};

  if (name) {
    queryObj.name = { $regex: name, $options: 'i' }; //! büyük küçük duyarsız için
  }

  const users = await User.find(queryObj).select("-password").populate("membership");

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Kullanıcı bulunamadı',
    });
  }

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // Validate input
  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(new AppError('Lütfen mevcut şifre, yeni şifre ve onay şifresini girin.', 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new AppError('Yeni şifre ve onay şifresi eşleşmiyor!', 400));
  }

  // Find user
  const user = await User.findById(req.user.id).select('+password');
  if (!user || !(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError('Geçersiz mevcut şifre!', 401));
  }

  // Update password
  user.password = newPassword;
  user.passwordConfirm = confirmPassword;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Şifre başarıyla değiştirildi.'
  });
});

exports.pushToken = catchAsync(async (req, res, next) => {
  const { pushToken } = req.body;
  const userId = req.user.id;
  if (!pushToken) {
    return next(new AppError('Lütfen bir push token girin.', 400));
  }
  await User.findByIdAndUpdate(userId, { pushToken }); // Token'ı veritabanına kaydet
  res.send({ success: true });
})

exports.getGenderStats = catchAsync(async (req, res, next) => {
  const genders = await User.aggregate([
    {
      $group: {
        _id: '$gender',
        count: { $sum: 1 }
      }
    }
  ]);

  // Format response
  const formatted = {
    kadın: 0,
    erkek: 0
  };

  genders.forEach(g => {
    formatted[g._id] = g.count;
  });

  res.status(200).json({
    status: 'success',
    data: formatted
  });
});



exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; 
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id); 
    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }

    req.user = currentUser; 
    next(); 
});
