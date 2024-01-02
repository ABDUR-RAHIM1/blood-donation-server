const mongoose = require('mongoose');

const userRegisterSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    contactNumber: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    problem: { type: String, required: true },
    howMuch: { type: String, required: true },
    needTime: { type: String, required: true },
    whereNeed: { type: String, required: true },
    profilePic: { type: String },
    message: { type: String, required: true },
    createAt: { type: Date, default: Date.now }
});

const userRegister = mongoose.model('userRegister', userRegisterSchema);

module.exports = userRegister;