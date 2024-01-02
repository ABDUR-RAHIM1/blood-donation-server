const sliderModel = require("../../models/slider/slider.model")

const getSlider = async (req, res) => {
    try {
        const slider = await sliderModel.find()
        res.status(200).json(slider)
    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            error: error.message
        })
    }
}

const addSlider = async (req, res) => {
    const { profilePic } = req.body;
    try {
        const newSlider = await sliderModel({
            profilePic
        });
        await newSlider.save();
        res.status(201).json({
            message: "Slider add Successfuly"
        })
    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            error: error.message
        })
    }
}

const deleteSlider = async (req, res) => {
    const { id } = req.params;
    try {
        const isDelete = await sliderModel.findByIdAndDelete(id);
        if (isDelete) {
            res.status(200).json({
                message: "Slider Delete Successful"
            })
        } else {
            res.status(404).json({
                message: "Slider Did not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            error: error.message
        })
    }
}

module.exports = { getSlider, addSlider, deleteSlider } 