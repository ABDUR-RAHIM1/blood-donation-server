const mongoose = require('mongoose');

const volunteerSchema = mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    add_by_name: { type: String, required: true },
    add_by_email: { type: String, required: true },
    fb_link: { type: String, required: true },
    t_link: { type: String, required: true },
    l_link: { type: String, required: true },
    profilePic: { type: String },
    createAt: { type: Date, default: Date.now }
});

const volunteerModel = mongoose.model('volunteer', volunteerSchema);

module.exports = volunteerModel;