const mongoose = require('mongoose');

const donarRegisterSchema = mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true},
    role : {type : String , required : true},
    contactNumber : {type : String , required : true},
    address : {type : String , required : true},
    dob : {type : String , required : true},
    donationDate : {type : String , required : true},
    donationTime : {type : String , required : true},
    gender : {type : String , required : true},
    bloodGroup : {type : String , required : true},
    weight : {type : String , required : true},
    emergencyContact : {type : String , required : true},
    relationshipContact : {type : String},
    beforeDonation : {type : String , required : true},
    profilePic : {type : String},
    message : {type : String , required : true},
});

const donarRegisterModel = mongoose.model('donarRegister', donarRegisterSchema);

module.exports = donarRegisterModel;