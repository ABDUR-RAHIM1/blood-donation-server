
const express = require("express");
const { addReview, deleteDonarReview } = require("../../controllers/review/reviewController");
const checkAuth = require("../../middlewere/checkAuth");

const router = express.Router();
// root =>  /api/review

router.post("/create/:donarId", checkAuth, addReview)
router.delete("/delete/:donarId/:reviewId", checkAuth, deleteDonarReview)

module.exports = router;