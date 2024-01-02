const userRegister = require("../../models/Register/User_register")


const getUsers = async (req, res) => {
    const {search} = req.query;
    try {
        const users = await userRegister.find({
            bloodGroup: { $regex: new RegExp(search, 'i') },
        }
        )
        res.status(200).json({
            message: "get All users",
            users,
        })
    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            error: error.message
        })
    }
}

const getSpecificUser = async (req, res) => {
    const { user } = req;
    const isUser = await userRegister.find({ email: user.email, name: user.name, role: user.role });

    try {
        if (isUser.length > 0) {

            res.status(200).json({
                message: "Get Specific user",
                ok: true,
                userInfo: isUser
            })
        } else {

            res.status(404).json({
                message: "You Have No Events",
                ok: false,
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            error: error.message
        })
    }
}

const registertUsers = async (req, res) => {
    const { contactNumber, bloodGroup, problem, howMuch, needTime, whereNeed, profilePic, message } = req.body;
    const { user } = req;
    try {

        const newDonar = await userRegister.create({
            name: user.name,
            email: user.email,
            role: user.role,
            bloodGroup,
            problem,
            howMuch,
            contactNumber,
            needTime,
            whereNeed,
            profilePic: profilePic || user.profilePic,
            message,
        });
        await newDonar.save();

        return res.status(201).json({
            message: "Registration Successful",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

const updatetUsers = async (req, res) => {
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
                message: "Update your Event"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Somthing went wrong",
            error: error.message
        })
    }
}

const deletetUsersRegister = async (req, res) => {
    const { id } = req.params; 

    try {
        const deletedRegister = await userRegister.findByIdAndDelete(id);

        if (deletedRegister) {
            res.status(200).json({
                message: "Event deleted successfully"
            });
        } else {
            res.status(404).json({
                message: "Event not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};


module.exports = { getUsers, getSpecificUser, registertUsers, updatetUsers, deletetUsersRegister }