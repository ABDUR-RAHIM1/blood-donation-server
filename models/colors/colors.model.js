
const mongoose = require("mongoose");

const colorsSchema = mongoose.Schema({
    name: { type: String, default :"colors"},
    cardBg: { type: String, required: true },
    cardText: { type: String, required: true },
    btnBg: { type: String, required: true },
    btnText: { type: String, required : true},
    formBg: { type: String, required: true },
    formText: { type: String, required: true },
    genarelBg: { type: String, required: true },
    genarelText: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const colorsModel = mongoose.model("color", colorsSchema);
module.exports = colorsModel;