const express = require("express")
const bodyFeaturesController = require("../controllers/bodyFeaturesController")
const authController = require("../controllers/authController")
const adminAuthController = require("../controllers/adminAuthController")
const protectMiddleware = require("../middlewares/protectUserOrAdmin")

const router = express.Router()

router.get("/:id", protectMiddleware.protectUserOrAdmin, bodyFeaturesController.getUserBodyFeatures) 

router.post("/", adminAuthController.protectAdmin, bodyFeaturesController.createBodyFeatures) 
router.patch("/", adminAuthController.protectAdmin, bodyFeaturesController.updateBodyFeatures) 
router.delete("/", adminAuthController.protectAdmin, bodyFeaturesController.deleteBodyFeatures) 

module.exports = router