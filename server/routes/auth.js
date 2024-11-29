const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Sign Up Route
router.post('/signup', async (req, res) => {
  console.log('Signup request body:', req.body);
  const { firstName, lastName, companyName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser  = await User.findOne({ email });
    if (existingUser ) {
      return res.status(400).json({ message: 'User  already exists' });
    }

    // Create new user
    const newUser  = new User({ firstName, lastName, companyName, email, password });
    await newUser .save();

    res.status(201).json({ message: 'User  registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password (no encryption, just a simple match)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Password Reset Route
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User  not found' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;