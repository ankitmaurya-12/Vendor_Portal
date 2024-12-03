const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    conPassword: { type: String, required: true }, // Ensure this field is required if needed
  });
  

const User = mongoose.model('User', userSchema);

module.exports = User;
