// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { User, Vendor, Admin, Approver } = require('../models/User.model');

// // Register User
// exports.registerUser = async (req, res) => {
//     const { email, password, firstName, lastName, role } = req.body;

//     try {
//         let newUser;

//         switch (role) {
//             case 'vendor':
//                 newUser = new Vendor({ email, password, firstName, lastName, role });
//                 break;
//             case 'admin':
//                 newUser = new Admin({ email, password, firstName, lastName, role });
//                 break;
//             case 'approver':
//                 newUser = new Approver({ email, password, firstName, lastName, role });
//                 break;
//             default:
//                 return res.status(400).json({ message: 'Invalid role' });
//         }

//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });

//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Login User
// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const payload = { id: user._id, role: user.role };
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.json({ token, user });

//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Vendor, Admin, Approver } = require('../models/User.model');

exports.registerUser = async (req, res) => {
    try {
        const { 
            fname: firstName,  // Map frontend field names to backend
            lname: lastName,
            email, 
            password,
            role,
            company: companyName,  // Map company to companyName
            businessType: category, // Map businessType to category
            department,
            approvalLimit
        } = req.body;

        // Validate required fields
        if (!email || !password || !firstName || !lastName || !role) {
            return res.status(400).json({ 
                message: 'Please provide all required fields' 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        let userData = {
            email,
            password,
            firstName,
            lastName,
            role,
            status: 'pending' // Use the status from your schema
        };

        let newUser;

        switch (role) {
            case 'vendor':
                if (!companyName) {
                    return res.status(400).json({ message: 'Company name is required for vendors' });
                }
                newUser = new Vendor({
                    ...userData,
                    companyName,
                    category,
                    vendorCode: `VEN${Date.now()}`
                });
                break;

            case 'admin':
                newUser = new Admin({
                    ...userData,
                    adminLevel: 1,
                    permissions: ['VIEW_REPORTS'],
                    department
                });
                break;

            case 'approver':
                if (!department) {
                    return res.status(400).json({ message: 'Department is required for approvers' });
                }
                newUser = new Approver({
                    ...userData,
                    department,
                    approvalLimit: approvalLimit || 0,
                    approvalLevel: 1
                });
                break;

            default:
                return res.status(400).json({ message: 'Invalid role specified' });
        }

        await newUser.save();

        // Create JWT token
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send response without password
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: userResponse
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Error registering user',
            error: error.message
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide both email and password'
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        // Check if user is active
        if (user.status !== 'active') {
            return res.status(403).json({
                message: 'Account is not active. Please contact administrator.'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user._id, 
                role: user.role,
                email: user.email 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Prepare user data (excluding sensitive information)
        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({
            message: 'Login successful',
            token,
            user: userData
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Error during login',
            error: error.message
        });
    }
};

// Optional: Add password reset functionality
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'If a user with this email exists, a password reset link will be sent.'
            });
        }

        // Generate password reset token
        const resetToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Here you would typically send an email with the reset token
        // For now, we'll just return it in the response
        res.status(200).json({
            message: 'Password reset instructions sent to email',
            resetToken // Remove this in production
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            message: 'Error processing forgot password request',
            error: error.message
        });
    }
};
