const mongoose = require('mongoose');

const donarRegisterSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'userId is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
    },
    contactNumber: {
        type: String,
        required: [true, 'Contact number is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
    },
    emergencyContact: {
        type: String,
        required: [true, 'Emergency contact is required'],
    },
    relationshipContact: {
        type: String,
        trim: true,
        default: null,
    },
    dob: {
        type: Date,
        required: [true, 'Date of birth is required'],
    },
    donationDate: {
        type: Date,
        required: [true, 'Donation date is required'],
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female', 'Others'],
    },
    bloodGroup: {
        type: String,
        required: [true, 'Blood group is required'],
        enum: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
    },
    weight: {
        type: Number,
        required: [true, 'Weight is required'],
        min: [30, 'Weight must be at least 30 kg'],
    },
    beforeDonation: {
        type: Number,
        required: [true, 'Donation frequency is required'],
        min: [0, 'Donation frequency cannot be negative'],
    },
    donationLocation: {
        type: String,
        required: [true, 'Donation location is required'],
        trim: true,
    },
    medicalCondition: {
        type: String,
        default: null,
    },
    allergies: {
        type: String,
        default: null,
    },
    lastDonationLocation: {
        type: String,
        default: null,
    },
    preferredDonationTime: {
        type: String,
        default: null,
    },
    photo: {
        type: String,
        default: null,
    },
    message: {
        type: String,
        default: null,
    },
}, { timestamps: true });

const DonarRegisterModel = mongoose.model('DonarRegister', donarRegisterSchema);

module.exports = DonarRegisterModel;
