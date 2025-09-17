const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {
    adminAuthenticate,
    adminAuthenticateBearer,
    adminAuthenticateFlexible
} = require("../../middlewares/adminAuthMiddleware.js");
const {
    adminLoginAction,
    adminLogout,    
    adminProfile
} = require("../../controllers/admin/adminController.js");

const { 
    usersList,
    viewUser,
    deleteUser
} = require("../../controllers/admin/userController.js");

// Admin authentication routes
router.post('/admin-action', adminLoginAction);
router.post('/admin-logout', adminLogout);

// Admin profile routes - support both query string and URL parameter
router.get('/admin-profile', adminAuthenticateFlexible, adminProfile);  // GET /api/admin-profile?id=1
router.get('/admin-profile/:id', adminAuthenticateFlexible, adminProfile);  // GET /api/admin-profile/1


// User management routes
router.get('/users', adminAuthenticateFlexible, usersList);
router.get('/view-user/:id', adminAuthenticateFlexible, viewUser);
router.delete('/delete-user/:id', adminAuthenticateFlexible, deleteUser);
// Admin authentication routes



// Test bcrypt password
router.post('/test-password', async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = '$2a$10$MMb6PA6oAQwzpvX0o96oxuvfSrDtRHWdR.NUMLKNqPn7X1pOsFfti';
        
        console.log('Testing password:', password);
        console.log('Hashed password:', hashedPassword);
        
        const isMatch = await bcrypt.compare(password, hashedPassword);
        
        res.json({
            success: true,
            passwordProvided: password,
            hashedPassword: hashedPassword,
            isMatch: isMatch,
            message: isMatch ? 'Password matches!' : 'Password does not match!'
        });
        
    } catch (error) {
        console.error('Password test error:', error);
        res.status(500).json({
            success: false,
            message: 'Password test failed',
            error: error.message
        });
    }
});

// Create new hashed password
router.post('/hash-password', async (req, res) => {
    try {
        const { password } = req.body;
        
        if (!password) {
            return res.status(400).json({
                success: false,
                message: 'Password is required'
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        res.json({
            success: true,
            originalPassword: password,
            hashedPassword: hashedPassword,
            message: 'Password hashed successfully!'
        });
        
    } catch (error) {
        console.error('Hash password error:', error);
        res.status(500).json({
            success: false,
            message: 'Hash password failed',
            error: error.message
        });
    }
});

router.get('/test', (req, res) => {
    res.send('Router is working!');
});

module.exports = router;