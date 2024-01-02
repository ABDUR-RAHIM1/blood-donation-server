
const donarRegisterModel = require('../../models/Register/Donar_register.model');

const getDonars = async (req, res) => {
    const { search } = req.query; 
  
    try { 
      const donars = await donarRegisterModel.find({ 
        bloodGroup: { $regex: new RegExp(search, 'i') },
      });
       
      if (donars && donars.length > 0) {
        res.status(200).json({
            message: "Get All Donars",
            donars: donars,
          });
      }else{
        res.status(404).json({
            message: "No donor found"
          });
      }
      
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  };
  


//  get specific donar / login donar information
const getSpecificDonarInfo = async (req, res) => {
    const { user } = req;
    const isDonar = await donarRegisterModel.find({ email: user.email, name: user.name });

    try {
        if (isDonar.length > 0) {

            res.status(200).json({
                message: "Get Specific Donar",
                ok: true,
                donarInfo: isDonar
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

const registerDonar = async (req, res) => {
    const { contactNumber, dob, profilePic, address, donationDate, donationTime, gender, bloodGroup, weight, emergencyContact, relationshipContact, beforeDonation, message } = req.body;
    const { user } = req;

    try {
        const isRegister = await donarRegisterModel.findOne({ email: user.email });

        if (!isRegister) {
            const newDonar = await donarRegisterModel.create({
                name: user.name,
                email: user.email,
                role: user.role,
                contactNumber,
                address,
                dob,
                donationDate,
                donationTime,
                gender,
                bloodGroup,
                weight,
                emergencyContact,
                relationshipContact,
                beforeDonation,
                profilePic: profilePic || user.profilePic,
                message,
            });
            await newDonar.save();

            return res.status(201).json({
                message: "Registration Successful",
            });
        }

        return res.status(400).json({
            message: "You have already created an event",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};




const updateDonar = async (req, res) => {

    const { id } = req.params;
    const isRegister = await donarRegisterModel.findOne({ _id: id })
    try {
        if (isRegister) {

            await donarRegisterModel.updateOne(
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

const deleteDonar = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDonar = await donarRegisterModel.findByIdAndDelete(id);

        if (deletedDonar) {
            res.status(200).json({
                message: "Donar deleted successfully"
            });
        } else {
            res.status(404).json({
                message: "Donar not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};


module.exports = { getDonars, getSpecificDonarInfo, registerDonar, updateDonar, deleteDonar }