// controllers/userProfileController.js
const { User, Vendor, Admin, Approver } = require('../models/User.model');

exports.getProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If user is a vendor, fetch vendor details
        let vendorDetails = null;
        if (user.role === 'vendor') {
            vendorDetails = await Vendor.findOne({ userId: userId });
        }

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            // Changed phone to PhoneNumber to match frontend
            PhoneNumber: user.PhoneNumber || '',
            address: user.address || '',
            website: user.website || '',
            bio: user.bio || '',
            profileImage: user.profileImage,
            // Return company name as both company and companyName for flexibility
            company: vendorDetails?.companyName || '',
            companyName: vendorDetails?.companyName || '',
            vendorId: vendorDetails?.vendorCode || 'Pending Approval',
            status: user.status
        });

    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ 
            message: 'Error fetching profile',
            error: error.message 
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updates = {
            // Map PhoneNumber from frontend to phone in database
            PhoneNumber: req.body.PhoneNumber,
            address: req.body.address,
            website: req.body.website,
            bio: req.body.bio
        };

        // Remove undefined fields
        Object.keys(updates).forEach(key => 
            updates[key] === undefined && delete updates[key]
        );

        // console.log('Updating user with:', updates); // Add this for debugging

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch vendor details if user is a vendor
        let vendorDetails = null;
        if (user.role === 'vendor') {
            vendorDetails = await Vendor.findOne({ userId: userId });
        }

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            // Return phone as PhoneNumber to match frontend
            PhoneNumber: user.PhoneNumber || '',
            address: user.address || '',
            website: user.website || '',
            bio: user.bio || '',
            profileImage: user.profileImage,
            company: vendorDetails?.companyName || '',
            companyName: vendorDetails?.companyName || '',
            vendorId: vendorDetails?.vendorCode || 'Pending Approval',
            status: user.status
        });

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ 
            message: 'Error updating profile',
            error: error.message 
        });
    }
};

exports.updateProfileImage = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        const imageUrl = req.file.path;

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { profileImage: imageUrl } },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch vendor details if user is a vendor
        let vendorDetails = null;
        if (user.role === 'vendor') {
            vendorDetails = await Vendor.findOne({ userId: userId });
        }

        res.status(200).json({
            message: 'Profile image updated successfully',
            imageUrl: user.profileImage,
            // Return full user data like other endpoints
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            PhoneNumber: user.PhoneNumber  || '',
            address: user.address || '',
            website: user.website || '',
            bio: user.bio || '',
            company: vendorDetails?.companyName || '',
            companyName: vendorDetails?.companyName || '',
            vendorId: vendorDetails?.vendorCode || 'Pending Approval',
            status: user.status
        });

    } catch (error) {
        console.error('Error updating profile image:', error);
        res.status(500).json({ 
            message: 'Error updating profile image',
            error: error.message 
        });
    }
};

module.exports = exports;