const mongoose = require('mongoose');

const blogScema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    postAt: {
        type: Date,
        default: Date.now,

    }
});

const blogs = mongoose.model('blogs', blogScema);

module.exports = blogs;