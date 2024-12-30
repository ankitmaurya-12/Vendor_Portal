const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userProfileController = require('../controllers/userProfileController');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Authentication routes
router.post('/signup', userController.registerUser);
router.post('/register', userController.registerUser); // Keep old route for compatibility
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);

// Profile routes
router.get('/profile/:userId', authenticateToken, userProfileController.getProfile);
router.put('/profile/:userId', authenticateToken, userProfileController.updateProfile);
router.post(
    '/profile/:userId/image',
    authenticateToken,
    upload.single('profileImage'),
    userProfileController.updateProfileImage
);

module.exports = router;