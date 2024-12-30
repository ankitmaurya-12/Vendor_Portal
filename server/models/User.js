const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // PhoneNumber: { type: Number, required: true, unique: true },
    PhoneNumber: { type: Number},
    password: { type: String, required: true },
    conPassword: { type: String, required: true, unique: true  }, 


    UserID: { type: Number, unique: true },
    role: {type: String},
    Status: {type: String},
    CreatedAt: {type: Date},
    UpdatedAt: {type: Date},

    // Added fields for profile
    address: { type: String },
    website: { type: String },
    bio: { type: String },
    profileImage: { type: String }

  });
  

const User = mongoose.model('User', userSchema);

module.exports = User;


//approver 
