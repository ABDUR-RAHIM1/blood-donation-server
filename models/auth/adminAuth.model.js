const mongoose = require('mongoose');

const adminAuthSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "admin" },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    profilePic: { type: String },
    date: { type: Date, default: Date.now }
})

const adminAuth = mongoose.model('admin-auth', adminAuthSchema)

module.exports = adminAuth;