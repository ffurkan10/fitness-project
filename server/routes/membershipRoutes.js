const express = require("express")
const membershipController = require("../controllers/membershipController")
const protectMiddleware = require("../middlewares/protectUserOrAdmin")
const adminAuthController = require("../controllers/adminAuthController")

const router = express.Router()

router.get("/:id", protectMiddleware.protectUserOrAdmin, membershipController.getUserMembership) 

router.post("/", adminAuthController.protectAdmin, membershipController.createMembership) 
router.patch("/", adminAuthController.protectAdmin, membershipController.updateMembership) 
router.delete("/", adminAuthController.protectAdmin, membershipController.deleteMembership) 

module.exports = router