const mongoose = require('mongoose');

const discountRequestSchema = new mongoose.Schema({
    salesOrder: {
        type: String,
        required: true
    },
    originalValue: {
        type: Number,
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
        type: String,
        required: true
    },
    requestDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DiscountRequest', discountRequestSchema);