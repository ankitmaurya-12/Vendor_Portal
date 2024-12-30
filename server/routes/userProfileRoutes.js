// routes/userProfileRoutes.js
const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const { authenticateToken } = require('../middleware/auth'); // Assuming you have auth middleware
const upload = require('../middleware/upload'); // Assuming you have multer middleware for file uploads

// Get user profile
router.get('/profile/:userId', authenticateToken, userProfileController.getProfile);

// Update user profile
router.put('/profile/:userId', authenticateToken, userProfileController.updateProfile);

// Update profile image
router.post(
    '/profile/:userId/image', 
    authenticateToken,
    upload.single('profileImage'), // Multer middleware
    userProfileController.updateProfileImage
);

module.exports = router;