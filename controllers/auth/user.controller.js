
const userAuth = require("../../models/auth/userAuth.model")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const getUsers = async (req, res) => {
    try {
        const users = await userAuth.find().select("-password");
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({
            message: 'Shomthing went wrong',
            error: error.message
        })
    }
}

const getOneUser = async (req, res) => {
    const { user } = req;

    const loginUser = await userAuth.findOne({ _id: user.userId }).select("-password")
    try {
        if (loginUser) {
            res.status(200).json(loginUser)
        } else {
            res.status(200).json({
                message: "No Accound Find Here"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Shomthing went wrong',
            error: error.message
        })
    }
}

const registerUsers = async (req, res) => {
    const { name, email, role, gender, password, photo } = req.body;

    try {
        const isEmail = await userAuth.findOne({ email });
        const hashPassword = await bcrypt.hash(password, 10)

        if (!isEmail) {
            const newUser = userAuth({
                name,
                email,
                gender,
                role,
                password: hashPassword,
                photo,
            });

            const user = await newUser.save();
            res.status(201).json({
                message: ' Register Successfull',
                ok: true,
                user
            })
        } else {
            res.status(401).json({
                message: 'Email Already  exist',
                ok: false,
            })
        }

    } catch (error) {

        res.status(500).json({
            message: 'Shomthing went wrong',
            ok: false,
            error: error.message
        })
    }
}

const loginUsers = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isValidEmail = await userAuth.findOne({ email })
        if (isValidEmail) {
            const isPassword = await bcrypt.compare(password, isValidEmail.password);
            if (isPassword) {
                res.status(200).json({
                    message: "login succesful",
                    ok: true,
                    token: jwt.sign({
                        userId: isValidEmail._id,
                        name: isValidEmail.name,
                        email: isValidEmail.email,
                        role: isValidEmail.role,

                    }, process.env.JWT_SECRET)
                })
            } else {
                res.status(500).json({
                    ok: false,
                    message: "Invalid Credintial!"
                })
            }
        } else {
            res.status(401).json({
                login: false,
                message: "Invalid Credintial!"
            })
        }


    } catch (error) {
        res.status(500).json({
            message: 'Shomthing went wrong',
            login: false,
            error: error.message
        })
    }
}

const resetUserPassword = async (req, res) => {
    const { name, email, gender, password } = req.body;

    const isUser = await userAuth.findOne({ email });
    try {

        const isUserAcoount = isUser && isUser.name === name && isUser.gender === gender
        if (isUserAcoount) {
            const hashPassword = await bcrypt.hash(password, 10)
            await isUser.updateOne({
                $set: {
                    password: hashPassword
                },
            }, { new: true });
            res.status(200).json({
                message: "Password reset successful"
            });

        } else {
            res.status(404).json({
                message: "Please Provide Correct information"
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Shomthing went wrong',
            error: error.message
        })
    }
}

const deleteUsers = async (req, res) => {
    const { id } = req.params;

    try {
        const isUser = await userAuth.findByIdAndDelete(id)
        if (isUser) {
            res.status(200).json({
                message: "A user has been deleted",
            })
        } else {
            res.status(400).json({
                message: "user not Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Somthing went wrong',
            error: error.message
        })
    }
}

module.exports = { getUsers, getOneUser, registerUsers, loginUsers, resetUserPassword, deleteUsers }