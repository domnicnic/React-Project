const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Public routes (no authentication required)
router.post('/login', adminController.login);
router.get('/health', adminController.healthCheck);

// Protected routes (authentication required)
router.use(adminController.verifyToken); // Middleware for all routes below

router.post('/logout', adminController.logout);
router.get('/profile', adminController.getProfile);
router.put('/profile', adminController.updateProfile);

router.put('/change-password', adminController.changePassword);
router.get('/all', adminController.getAllAdmins);
module.exports = router; 