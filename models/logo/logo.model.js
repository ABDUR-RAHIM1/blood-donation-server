const mongoose = require('mongoose');

const logoSchema = mongoose.Schema({
    name: { type: String, default : "logo" },
    profilePic: { type: String, required: true },
    logoWidth: { type: String, required: true },
    radius: { type: String, required: true },
    logoHeight: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const logo = mongoose.model('logo', logoSchema)

module.exports = logo;