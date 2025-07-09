const express = require("express")
const nutritionController = require("../controllers/nutritionController")
const authController = require("../controllers/authController")
const protectMiddleware = require("../middlewares/protectUserOrAdmin")
const adminAuthController = require("../controllers/adminAuthController")

const router = express.Router()

router.get("/:id", protectMiddleware.protectUserOrAdmin, nutritionController.getUserNutrition) 
router.post("/", adminAuthController.protectAdmin, nutritionController.createNutrition) 
router.patch("/", adminAuthController.protectAdmin, nutritionController.updateNutrition) 
router.delete("/", adminAuthController.protectAdmin, nutritionController.deleteNutrition) 

module.exports = router