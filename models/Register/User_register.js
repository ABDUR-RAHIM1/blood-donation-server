const mongoose = require('mongoose');

const donationAppointmentSchema = mongoose.Schema({
    userId: { type: String, required: true },
    refName: { type: String, required: true },
    refEmail: { type: String, required: true },
    patientName: { type: String, required: true },
    patientAge: { type: Number, required: true },
    contactNumber: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    problem: { type: String, required: true },
    howMuch: { type: Number, required: true },
    needTime: { type: String, required: true },
    location: { type: String, required: true },
    hospital: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    urgency: { type: String, required: true },
    doctorContact: { type: String },
    photo: { type: String },
    message: { type: String, required: true },
    donationStatus: {
        type: String,
        required: true,
        enum: ["yes", "no"],
        default: "no"
    },
    createdAt: { type: Date, default: Date.now },
});

const userRegister = mongoose.model('DonationAppointment', donationAppointmentSchema);

module.exports = userRegister;
