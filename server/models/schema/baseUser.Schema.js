const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const baseUserSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true
    },
    password: { 
        type: String, 
        required: true 
    },
    firstName: { 
        type: String, 
        required: true,
        trim: true 
    },
    lastName: { 
        type: String, 
        required: true,
        trim: true 
    },
    role: { 
        type: String, 
        required: true, 
        enum: ['vendor', 'admin', 'approver', 'masterAdmin'] 
    },
    status: { 
        type: String, 
        default: 'pending', 
        enum: ['pending', 'active', 'inactive', 'suspended'] 
    },
    PhoneNumber: {  
        type: String,
        trim: true
    },
    address: { 
        type: String,
        trim: true 
    },
    website: { 
        type: String,
        trim: true 
    },
    bio: { 
        type: String,
        trim: true 
    },
    profileImage: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    twoFactorEnabled: {
        type: Boolean,
        default: false
    },
    lastLogin: Date,
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}, { 
    discriminatorKey: 'userType', 
    timestamps: true 
});

baseUserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

baseUserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = baseUserSchema;