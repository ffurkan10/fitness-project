const jwt = require('jsonwebtoken');
const AdminUser = require('../models/adminUserModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id, role) => {
    return jwt.sign({ id: id, role: role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

exports.adminSignUp = catchAsync(async (req, res, next) => {
    const newAdminUser = await AdminUser.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newAdminUser._id, "admin");

    res.status(201).json({
        status: 'success',
        token,
        data: {
            newAdminUser,
        },
    });
});

exports.adminLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Lütfen alanları doğru girdiğinizden emin olunuz.', 400));
    }

    const adminUser = await AdminUser.findOne({ email }).select("+password");

    if (!adminUser || !(await adminUser.correctPassword(password, adminUser.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    const token = signToken(adminUser._id, "admin");

    res.status(200).json({
        status: 'success',
        token,
    });
});

exports.getAdminProfile = catchAsync(async (req, res, next) => {
    const user = await AdminUser.findById(req.admin._id).select("-password");
    if(!user) {
        return next(new AppError('Kullanıcı Bulunamadı', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
})

exports.protectAdmin = catchAsync(async (req, res, next) => {
    let token;

    //! Authorization header'ında token varsa al
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    //! Token yoksa hata
    if (!token) {
        return next(new AppError('Bu işlemi yapmak için giriş yapmalısınız.', 401));
    }

    //! Token'ı verify et
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //! Admin kullanıcı veritabanında hâlâ var mı?
    const currentAdmin = await AdminUser.findById(decoded.id);
    if (!currentAdmin) {
        return next(new AppError('Bu token ait bir kullanıcı artık mevcut değil.', 401));
    }

    //! Token geçerli ve admin mevcutsa, isteğe ekle
    req.admin = currentAdmin;
    next();
});