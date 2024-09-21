const userRegister = require("../../models/Register/User_register")


const getAllAppoinment = async (req, res) => {
    const { search } = req.query;


    try {

        const query = search ? { bloodGroup: search } : {};

        const recipients = await userRegister.find(query);
        res.status(200).json(recipients);

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};


const getUniqueAppoinemnt = async (req, res) => {
    const { user } = req;

    try {

        const isUser = await userRegister.find({ userId: user.userId });
        res.status(200).json(isUser)

    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            error: error.message
        })
    }
}

const registerAppoinment = async (req, res) => {

    const { patientName, patientAge, contactNumber, bloodGroup, problem, howMuch, needTime, location, hospital, preferredDate, urgency, doctorContact, photo, message } = req.body;

    const { user } = req;

    try {
        const formattedDate = preferredDate.split('T')[0];


        const newAppoinment = await userRegister.create({
            userId: user.userId,
            refName: user.name,
            refEmail: user.email,
            patientName,
            patientAge,
            bloodGroup,
            problem,
            howMuch,
            contactNumber,
            needTime,
            location,
            hospital,
            preferredDate: formattedDate,
            urgency,
            doctorContact,
            photo: photo,
            message,
        });

        await newAppoinment.save();

        return res.status(201).json({
            message: "Appoinment Successful",
            ok: true,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
            ok: false,
        });

    }
};


const updateAppoinment = async (req, res) => {
    const { id } = req.params;
    const isRegister = await userRegister.findOne({ _id: id })
    try {
        if (isRegister) {

            await userRegister.updateOne(
                { _id: id },
                {
                    $set: req.body,
                }
            );
            res.status(200).json({
                message: "Successful Updated !",
                ok: true,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            error: error.message,
            ok: true,
        })
    }
}

const deleteAppoinment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRegister = await userRegister.findByIdAndDelete(id);

        if (deletedRegister) {
            res.status(200).json({
                message: "deleted successful",
                ok: true,
            });
        } else {
            res.status(404).json({
                message: "not found",
                ok: false,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
            ok: false,
        });
    }
};


module.exports = { getAllAppoinment, getUniqueAppoinemnt, registerAppoinment, updateAppoinment, deleteAppoinment }