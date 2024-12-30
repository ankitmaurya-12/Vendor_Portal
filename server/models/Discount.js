// const mongoose = require('mongoose');

// const discountRequestSchema = new mongoose.Schema({
//   salesOrder: { type: String, required: true, unique: true },
//   orderType: { type: String, required: true },
//   netValue: { type: Number, required: true },
//   customer: { type: String, required: true },
//   discountPercentage: { type: Number, required: true },
//   discountAmount: { type: Number, required: true },
//   finalValue: { type: Number, required: true },
//   status: {
//     type: String,
//     enum: ['PENDING_APPROVAL', 'APPROVED', 'REJECTED'],
//     default: 'PENDING_APPROVAL'
//   },
//   requestedBy: { type: String, required: true },
//   approvedBy: { type: String },
//   approvalDate: { type: Date },
//   rejectionReason: { type: String },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('DiscountRequest', discountRequestSchema);



const mongoose = require('mongoose');

const discountRequestSchema = new mongoose.Schema({
    salesOrder: { 
        type: String, 
        required: true, 
        unique: true 
    },
    orderType: { 
        type: String, 
        required: true 
    },
    netValue: { 
        type: Number, 
        required: true 
    },
    customer: { 
        type: String, 
        required: true 
    },
    discountPercentage: { 
        type: Number, 
        required: true 
    },
    discountAmount: { 
        type: Number, 
        required: true 
    },
    finalValue: { 
        type: Number, 
        required: true 
    },
    status: {
        type: String,
        enum: ['PENDING_APPROVAL', 'APPROVED', 'REJECTED'],
        default: 'PENDING_APPROVAL'
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approvalDate: Date,
    rejectionReason: String,
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});
