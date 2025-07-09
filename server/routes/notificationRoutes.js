const express = require("express")
const notificationController = require("../controllers/notificationController")
const protectMiddleware = require("../middlewares/protectUserOrAdmin")
const adminAuthController = require("../controllers/adminAuthController")

const router = express.Router()

router.get("/", protectMiddleware.protectUserOrAdmin, notificationController.getUserNotifications) 
router.get("/all", adminAuthController.protectAdmin, notificationController.getAllNotifications)
router.post("/", adminAuthController.protectAdmin, notificationController.createNotification) 
router.patch("/:id/read", protectMiddleware.protectUserOrAdmin, notificationController.markNotificationAsRead) 

module.exports = router