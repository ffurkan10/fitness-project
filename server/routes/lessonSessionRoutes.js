const express = require("express")
const adminAuthController = require("../controllers/adminAuthController")
const protectMiddleware = require("../middlewares/protectUserOrAdmin")
const lessonCtrl = require("../controllers/lessonSessionController")

const router = express.Router()

router.post('/', adminAuthController.protectAdmin, lessonCtrl.createLesson);
router.get('/userLessons/:id', protectMiddleware.protectUserOrAdmin, lessonCtrl.getUserLessons);
router.patch('/:id', adminAuthController.protectAdmin, lessonCtrl.updateLesson);
router.delete('/:id', adminAuthController.protectAdmin, lessonCtrl.deleteLesson);
router.get('/occupiedSlots', adminAuthController.protectAdmin, lessonCtrl.getOccupiedSlots);

module.exports = router



// router.patch('/:id/postpone', lessonCtrl.postponeLesson);
// router.patch('/:id/complete', lessonCtrl.completeLesson);

