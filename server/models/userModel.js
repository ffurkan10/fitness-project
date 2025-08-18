const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Lütfen adını giriniz!'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Lütfen telefon numarası giriniz!'],
        unique: true,
    },
    gender: {
        type: String,
        enum: ['kadın', 'erkek'],
        required: true
    },
    password: {
        type: String,
        required: [true, 'Lütfen şifre giriniz!'],
        minlength: 8,
        select: false, //! false yaparak şifreyi istemciye göndermiyoruz
    },
    passwordConfirm: {
        type: String,
        required: [true, "Lütfen şifreyi onaylayınız!"],
        validate: {
            validator: function (val) {
                return val === this.password; //! this.password ile passwordConfirm'un aynı olup olmadığını kontrol ediyoruz
            }
        }
    },
    pushToken: {
        type: String
    },
    membership: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Membership'
    },
    nutrition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nutrition'
    },
    bodyFeatures: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BodyFeatures'
    },
    workouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout'
    }],
    lessonSessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LessonSession'
    }],
},{ timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); //! password değişmemişse next() ile geçiyoruz
    this.password = await bcrypt.hash(this.password, 12); //! password'u hashliyoruz
    this.passwordConfirm = undefined; //! passwordConfirm'u undefined yapıyoruz
    next(); //! middleware'i geçiyoruz
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword); //? password alanını karşılaştır
}

userSchema.pre('findOneAndDelete', async function (next) {
  const user = await this.model.findOne(this.getFilter());

  if (!user) return next();

  const Membership = require('../models/membershipModel');
  const Nutrition = require('../models/nutritionModel');
  const BodyFeatures = require('../models/bodyFeaturesModel');
  const Workout = require('../models/workoutModel');

  //! İlişkili verileri sil
  if (user.membership) await Membership.findByIdAndDelete(user.membership);
  if (user.nutrition) await Nutrition.findByIdAndDelete(user.nutrition);
  if (user.bodyFeatures) await BodyFeatures.findByIdAndDelete(user.bodyFeatures);
  if (user.workouts && user.workouts.length > 0)
    await Workout.deleteMany({ _id: { $in: user.workouts } });

  next();
});


const User = mongoose.model('User', userSchema); //! User modelini oluşturuyoruz

module.exports = User; //! User modelini dışarı aktarıyoruz