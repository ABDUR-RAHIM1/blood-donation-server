//  doner register => get , create , update,delete  => router 

const express = require('express');
const { getDonars, registerDonar, updateDonar, deleteDonar, getUniqueDonar, } = require("../../controllers/register/donar_register.controller");

const checkAuth = require("../../middlewere/checkAuth");
const router = express.Router();



router.get('/donars', getDonars);
router.get('/donars-one', checkAuth, getUniqueDonar);
router.post('/register', checkAuth, registerDonar);
router.put('/update/:id', updateDonar);
router.delete('/delete/:id', deleteDonar);

module.exports = router;