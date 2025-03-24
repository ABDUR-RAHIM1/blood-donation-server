//  doner register => get , create , update,delete  => router 

const express = require('express');
const { getSlider , addSlider , deleteSlider } = require("../../controllers/slider/slider.controller");
 

const router = express.Router();



router.get('/sliders', getSlider);
router.post('/add', addSlider);
router.delete('/delete/:id', deleteSlider);

module.exports = router;