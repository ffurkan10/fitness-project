const express = require("express")
const authController = require("../controllers/authController")
const adminAuthController = require("../controllers/adminAuthController")
const protectMiddleware = require("../middlewares/protectUserOrAdmin")
const router = express.Router()

router.get("/me", authController.protect, authController.userInformation) //? kullanıcı bilgilerini almak için
router.get("/", adminAuthController.protectAdmin, authController.getAllUsers) //? kullanıcı bilgilerini almak için
router.post("/signup", authController.signUp) 
router.post("/login", authController.login) 
router.delete("/:id", adminAuthController.protectAdmin, authController.deleteUser) //? kullanıcı silmek için
router.get("/push-token", protectMiddleware.protectUserOrAdmin, authController.pushToken)
router.get('/stats/gender', adminAuthController.protectAdmin, authController.getGenderStats);


module.exports = router