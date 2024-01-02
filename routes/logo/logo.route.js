const express = require('express'); 
const { getLogo , updateLogo } = require("../../controllers/logo/logo.controller");  

const router = express.Router();



router.get('/logos', getLogo); 
router.put('/update/:id', updateLogo); 

module.exports = router;