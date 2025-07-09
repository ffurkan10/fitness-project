const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AdminUser = require("../models/adminUserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.protectUserOrAdmin = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Giriş yapmalısınız!", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role === "admin") {
    const admin = await AdminUser.findById(decoded.id);
    if (!admin) return next(new AppError("Admin bulunamadı!", 401));
    req.admin = admin;
  } else if (decoded.role === "user") {
    const user = await User.findById(decoded.id);
    if (!user) return next(new AppError("Kullanıcı bulunamadı!", 401));
    req.user = user;
  } else {
    return next(new AppError("Geçersiz token rolü!", 401));
  }

  next();
});
