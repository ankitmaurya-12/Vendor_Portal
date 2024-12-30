const mongoose = require('mongoose');

const approverSchema = new mongoose.Schema({
    department: { 
        type: String, 
        required: true 
    },
    approvalLevel: {
        type: Number,
        default: 1
    },
    approvalLimit: {
        type: Number
    },
    delegatedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    delegationEndDate: Date
});