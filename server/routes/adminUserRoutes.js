const express = require("express")
const adminAuthController = require("../controllers/adminAuthController")

const router = express.Router()

router.post("/adminSignUp", adminAuthController.adminSignUp) 
router.post("/adminLogin", adminAuthController.adminLogin) 
router.get("/", adminAuthController.protectAdmin, adminAuthController.getAdminProfile)

module.exports = router