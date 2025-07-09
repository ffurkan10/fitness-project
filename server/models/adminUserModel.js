const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const adminUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Lütfen adını giriniz!'],
    },
    email: {
        type: String,
        required: [true, 'Lütfen e-posta adresinizi giriniz!'],
        unique: true, 
        lowercase: true, 
        validate: [validator.isEmail, 'Lütfen geçerli bir e-posta adresi giriniz!'], 
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
},{ timestamps: true })

adminUserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); //! password değişmemişse next() ile geçiyoruz
    this.password = await bcrypt.hash(this.password, 12); //! password'u hashliyoruz
    this.passwordConfirm = undefined; //! passwordConfirm'u undefined yapıyoruz
    next(); //! middleware'i geçiyoruz
})

adminUserSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword); //? password alanını karşılaştır
}

const AdminUser = mongoose.model('AdminUser', adminUserSchema); //! User modelini oluşturuyoruz

module.exports = AdminUser; //! User modelini dışarı aktarıyoruz