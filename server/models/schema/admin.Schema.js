const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminLevel: { 
        type: Number, 
        required: true 
    },
    permissions: [{
        type: String,
        enum: [
            'MANAGE_VENDORS',
            'MANAGE_APPROVERS',
            'MANAGE_SETTINGS',
            'VIEW_REPORTS',
            'MANAGE_USERS'
        ]
    }],
    clientConfig: {
        logo: String,
        theme: {
            primaryColor: String,
            secondaryColor: String,
            fontFamily: String
        },
        emailTemplates: {
            vendorApproval: String,
            vendorRejection: String,
            welcomeEmail: String
        }
    }
});