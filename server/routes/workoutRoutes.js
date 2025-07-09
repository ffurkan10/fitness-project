const express = require("express")
const workoutController = require("../controllers/workoutController")
const authController = require("../controllers/authController")
const protectMiddleware = require("../middlewares/protectUserOrAdmin")
const adminAuthController = require("../controllers/adminAuthController")
const router = express.Router()

router.get("/:id", protectMiddleware.protectUserOrAdmin, workoutController.getUserNutrition) 
router.post("/", adminAuthController.protectAdmin, workoutController.createWorkout) 
router.patch("/", adminAuthController.protectAdmin, workoutController.updateWorkout) 
router.delete("/", adminAuthController.protectAdmin, workoutController.deleteWorkout) 

module.exports = router