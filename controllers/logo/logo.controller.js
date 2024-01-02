const logoModel = require("../../models/logo/logo.model");


const getLogo = async (req, res) => {
    try {
        const logo = await logoModel.find()
        res.status(200).json(logo)
    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            error: error.message
        })
    }
}

const updateLogo = async (req, res) => {
    try {
        const { id } = req.params;
        const isUpdate = await logoModel.updateOne({ name: id }, {
            $set: req.body
        });
        if (isUpdate) {
            res.status(200).json({ message: "logo has been changed" })
        } else {
            res.status(200).json({ message: "cannot found this logo" })
        }
    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            error: error.message
        })
    }
}



module.exports = { getLogo, updateLogo } 