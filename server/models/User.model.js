const mongoose = require('mongoose');
const baseUserSchema = require('./schema/baseUser.Schema');
const vendorSchema = require('./schema/vendor.Schema');
const adminSchema = require('./schema/admin.Schema');
const approverSchema = require('./schema/approver.Schema');

// Base User Model
const User = mongoose.model('User', baseUserSchema);

// Discriminator Models
const Vendor = User.discriminator('Vendor', vendorSchema);
const Admin = User.discriminator('Admin', adminSchema);
const Approver = User.discriminator('Approver', approverSchema);

module.exports = {
    User,
    Vendor,
    Admin,
    Approver
};
