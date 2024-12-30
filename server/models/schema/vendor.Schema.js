const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    companyName: { 
        type: String, 
        required: true 
    },
    vendorCode: {
        type: String,
        unique: true
    },
    gstNumber: { 
        type: String,
        unique: true 
    },
    category: {
        type: String,
        required: true
    },
    documents: [{
        name: String,
        path: String,
        uploadedAt: Date,
        verified: Boolean
    }],
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approvalDate: Date,
    performanceMetrics: {
        rating: Number,
        completedProjects: Number,
        onTimeDelivery: Number
    }
});