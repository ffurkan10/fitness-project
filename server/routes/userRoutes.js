const express = require("express")
const authController = require("../controllers/authController")
const adminAuthController = require("../controllers/adminAuthController")
const router = express.Router()

router.get("/:id", authController.protect, authController.userInformation) //? kullanıcı bilgilerini almak için
router.get("/", adminAuthController.protectAdmin, authController.getAllUsers) //? kullanıcı bilgilerini almak için
router.post("/signup", authController.signUp) //? kullanıcı kaydı için
router.post("/login", authController.login) //? kullanıcı kaydı için
router.delete("/:id", adminAuthController.protectAdmin, authController.deleteUser) //? kullanıcı silmek için
router.get('/stats/gender', adminAuthController.protectAdmin, authController.getGenderStats);


module.exports = router