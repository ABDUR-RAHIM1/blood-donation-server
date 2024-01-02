const colorsModel = require("../../models/colors/colors.model");


const getColors = async (req, res) => {
    try {
        const colors = await colorsModel.find();
        res.status(200).json(colors)
    } catch (error) {
        res.status(500).json({
            message: "somthing went wrong",
            error: error.message
        })
    }
}

const addColors = async (req, res) => {
    const { cardBg, cardText, btnBg, btnText, formBg, formText, genarelBg, genarelText } = req.body;
    try {
        const isColor = await colorsModel.findOne({ name: "colors" });
        if (isColor) {
            res.status(403).json({
                message: "Color Palate Alrady Exist , Eidt Now"
            })
            return
        }

        const newColor = await colorsModel({
            cardBg,
            cardText,
            btnBg,
            btnText,
            formBg,
            formText,
            genarelBg,
            genarelText
        });
        await newColor.save(newColor);
        res.status(201).json({
            message: "Color Add Successful"
        })
    } catch (error) {
        res.status(500).json({
            message: "somthing went wrong",
            error: error.message
        })
    }
}

const editColors = async (req, res) => {
    try {
        const { id } = req.params;
        const isUpdate = await colorsModel.updateOne({ name: id }, {
            $set: req.body
        });
        if (isUpdate) {
            res.status(200).json({
                message: "Color change successfuly",
            })
        } else {
            res.status(404).json({
                message: "Color Palate not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "somthing went wrong",
            error: error.message
        })
    }
}

const deleteColors = async (req, res) => {
    res.send("delete")
}

module.exports = { addColors, getColors, editColors, deleteColors }