const mongoose = require('mongoose');

const userAuthSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "user" },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    photo: { type: String },
    date: { type: Date, default: Date.now }
})

const userAuth = mongoose.model('user-auth', userAuthSchema)

module.exports = userAuth;