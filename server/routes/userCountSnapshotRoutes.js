const express = require("express")
const userCountSnapshotController = require("../controllers/userCountSnapshotController")
const adminAuthController = require("../controllers/adminAuthController")
const router = express.Router()

router.get("/", adminAuthController.protectAdmin, userCountSnapshotController.getMonthlyStats) //? kullanıcı bilgilerini almak için

module.exports = router