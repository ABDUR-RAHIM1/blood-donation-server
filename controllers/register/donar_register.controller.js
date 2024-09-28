
const DonarRegisterModel = require('../../models/Register/Donar_register.model');

const getDonars = async (req, res) => {
    const { search } = req.query;

    try {
        const query = search ? { bloodGroup: search } : {};

        const donars = await DonarRegisterModel.find(query);
        res.status(200).json(donars);

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};



// Get specific donor / login donor information
const getUniqueDonar = async (req, res) => {
    const { user } = req;

    try {
        const isDonar = await DonarRegisterModel.findOne({ userId: user.userId });

        if (isDonar) {
            res.status(200).json(isDonar);
        } else {
            res.status(404).json({
                message: "You have no events",
                ok: false,
            });
        }
    } catch (error) {

        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}


const registerDonar = async (req, res) => {
    const { user } = req;

    const {
        contactNumber,
        dob,
        photo,
        address,
        donationDate,
        gender,
        bloodGroup,
        weight,
        emergencyContact,
        relationshipContact,
        beforeDonation,
        message,
        donationLocation,
        medicalCondition,
        allergies,
        lastDonationLocation,
        preferredDonationTime
    } = req.body;



    try {

        const isRegistered = await DonarRegisterModel.findOne({ email: user.email });

        if (!isRegistered) {
            // Create a new donor profile
            const newDonar = new DonarRegisterModel({
                userId: user.userId,
                name: user.name,
                email: user.email,
                role: user.role,
                contactNumber,
                address,
                dob,
                donationDate,
                gender,
                bloodGroup,
                weight,
                emergencyContact,
                relationshipContact,
                beforeDonation,
                donationLocation,
                medicalCondition,
                allergies,
                lastDonationLocation,
                preferredDonationTime,
                photo,
                message,
            });


            await newDonar.save();

            // Send a success response
            return res.status(201).json({
                ok: true,
                message: "Registration successful",
            });
        }

        // If already registered, send a conflict response
        return res.status(409).json({
            ok: false,
            message: "You have already registered as a donor.",
        });

    } catch (error) {
        // Handle errors during registration
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Something went wrong during registration.",
            error: error.message,
        });
    }
};




const updateDonar = async (req, res) => {
    const { id } = req.params;

    try {
        const isRegister = await DonarRegisterModel.findOne({ _id: id });

        if (isRegister) {
            let updateFields = req.body;

            // Check if lastDonationDate is being updated
            if (req.body.donationDate) {

                updateFields.beforeDonation = isRegister.beforeDonation + 1;
            }

            await DonarRegisterModel.updateOne(
                { _id: id },
                {
                    $set: updateFields,
                }
            );

            res.status(200).json({
                message: "Donar information updated successfully!",
            });
        } else {
            res.status(404).json({
                message: "Donar not found!",
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


const deleteDonar = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDonar = await DonarRegisterModel.findByIdAndDelete(id);

        if (deletedDonar) {
            res.status(200).json({
                message: "  deleted successful",
                ok: true
            });
        } else {
            res.status(404).json({
                message: "Donar not found",
                ok: false
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};


module.exports = { getDonars, getUniqueDonar, registerDonar, updateDonar, deleteDonar }