
const volunteerModel = require("../../models/volunteer/volunteer.model")

const getVolunteer = async (req, res) => {
    try {
        const isVolunteer = await volunteerModel.find()
        res.status(200).json({
            message: "get All volunteer",
            volunteer: isVolunteer
        })
    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            error: error.message
        })
    }
}

const getAddVolunteer = async (req, res) => {
    const { user } = req;
    const isVolunteer = await volunteerModel.find({ add_by_name: user.name, add_by_email: user.email });


    try {
        if (isVolunteer) {
            res.status(200).json(isVolunteer)
        } else {
            res.status(404).json({
                message: "no one volunteer"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            error: error.message
        })
    }
}

const addVolunteer = async (req, res) => {
    const { user } = req;
    const { name, title, fb_link, t_link, l_link, profilePic } = req.body;

    try {
        const newVolunteer = await volunteerModel({
            add_by_name: user.name,
            add_by_email: user.email,
            name,
            title,
            fb_link,
            t_link,
            l_link,
            profilePic
        });
        await newVolunteer.save();
        res.status(201).json({
            message: "Volunteer Add Successfuly"
        })
    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            error: error.message
        })
    }
}

const updateVolunteer = async (req, res) => {
    const { id } = req.params;
    const isVolunteer = await volunteerModel.findOne({ _id: id })
    try {
        if (isVolunteer) {

            await volunteerModel.updateOne(
                { _id: id },
                {
                    $set: req.body,
                }
            );
            res.status(200).json({
                message: "Update Volunteer"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            error: error.message
        })
    }
}

const deleteVolunteer = async (req, res) => {
    const { id } = req.params;

    try {
        const isVolunteer = await volunteerModel.findByIdAndDelete(id);

        if (isVolunteer) {
            res.status(200).json({
                message: "Volunteer deleted successfully"
            });
        } else {
            res.status(404).json({
                message: "Volunteer not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}


module.exports = { getVolunteer, getAddVolunteer, addVolunteer, updateVolunteer, deleteVolunteer }