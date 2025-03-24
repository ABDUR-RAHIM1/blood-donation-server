
const DonarRegisterModel = require("../../models/Register/Donar_register.model");

 const addReview = async (req, res) => {
    const { donarId } = req.params;
    const { user } = req;
    const { rating, comment } = req.body;

    try {

        const donor = await DonarRegisterModel.findById(donarId);
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }

        const newReview = { reviewerId: user.userId, name: user.name, rating, comment };
        donor.reviews.push(newReview);
        await donor.save();

        // শুধু সৃষ্ট রিভিউ ফেরত পাঠানো
        res.status(200).json({ message: 'Review added successfully', review: newReview });


    } catch (error) {
        return res.status(500).json({
            message: "failed to submit Review",
            error: error
        })
    }
}



const deleteDonarReview = async (req, res) => {
    const { donarId, reviewId } = req.params;
    const { userId } = req.user;

    try {

        const donor = await DonarRegisterModel.findById(donarId);
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }

        const review = donor.reviews.find(review => review._id.toString() === reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.reviewerId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized! You can only delete your own review.' });
        }

        donor.reviews = donor.reviews.filter(review => review._id.toString() !== reviewId);

        await donor.save();

        res.status(200).json({ message: 'Review deleted successfully' });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete review",
            error: error.message
        });
    }
};


module.exports = {
    addReview,
    deleteDonarReview
};