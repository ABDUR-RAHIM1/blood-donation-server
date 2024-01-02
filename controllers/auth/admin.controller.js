const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const adminAuth = require("../../models/auth/adminAuth.model");

const getAllAdmin = async (req, res) => {
    try {
        const admin = await adminAuth.find();
        res.status(200).json(admin)
    } catch (error) {
        res.status(500).json({
            message: 'Shomthing went wrong',
            error: error.message
        })
    }
}

 

const registerAdmin = async (req, res) => {
    const { name, email, role, gender, password, profilePic, date } = req.body;

    try {
        const isEmail = await adminAuth.findOne({ email });
        const hashPassword = await bcrypt.hash(password, 10)

        if (!isEmail) {
            const newDonar = adminAuth({
                name,
                email,
                gender,
                role,
                password: hashPassword,
                profilePic,
                date
            });

            const donar = await newDonar.save();
            res.status(201).json({
                message: 'Admin Register Successfull',
                register: true,
            })
        } else {
            res.status(401).json({
                message: 'Email Already  exist',
                register: false,
            })
        }

    } catch (error) {

        res.status(500).json({
            message: 'Shomthing went wrong',
            register: false,
            error: error.message
        })
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isAdmin = await adminAuth.findOne({ email })
        if (isAdmin) {
            const isPassword = await bcrypt.compare(password, isAdmin.password);
            if (isPassword) {
                res.status(200).json({
                    message: "login succesful",
                    login: true,
                    token: jwt.sign({
                        name: isAdmin.name,
                        email: isAdmin.email,
                        role: isAdmin.role,
                        profilePic: isAdmin.profilePic
                    }, process.env.JWT_SECRET)
                })
            } else {
                res.status(500).json({
                    login: false,
                    message: "Invalid Credintial 😪"
                })
            }
        } else {
            res.status(401).json({
                login: false,
                message: "Invalid Credintial 😪"
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

const resetAdminPass = async (req, res) => {
    const { name, email, gender, password } = req.body;

    const isAdmin = await adminAuth.findOne({ email });

    try {

        const isAdminAccount = isAdmin && isAdmin.name === name && isAdmin.gender === gender
        if (isAdminAccount) {
            const hashPassword = await bcrypt.hash(password, 10)
            await isAdmin.updateOne({
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

 

module.exports = { getAllAdmin, registerAdmin, loginAdmin, resetAdminPass }