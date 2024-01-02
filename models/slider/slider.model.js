const mongoose = require('mongoose');

const sliderSchema = mongoose.Schema({ 
    profilePic: { type: String ,required : true },
    date: { type: Date, default: Date.now }
})

const slider = mongoose.model('slider', sliderSchema)

module.exports = slider;