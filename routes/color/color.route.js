const express = require('express');

const { getColors ,editColors , addColors , deleteColors } = require("../../controllers/color/color.controller");
 

const router = express.Router();



router.get('/colors', getColors);
router.post('/add', addColors);
router.put('/update/:id', editColors);
router.delete('/delete/:id', deleteColors);

module.exports = router;