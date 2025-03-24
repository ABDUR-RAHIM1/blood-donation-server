//  user register => get , create , update,delete  => router 

const express = require('express');

const checkAuth = require("../../middlewere/checkAuth");
const { getAllAppoinment, getUniqueAppoinemnt, registerAppoinment, updateAppoinment, deleteAppoinment } = require("../../controllers/register/user_register.controller");



const router = express.Router();



router.get('/users', getAllAppoinment);
router.get('/users-one', checkAuth, getUniqueAppoinemnt);
router.post('/register', checkAuth, registerAppoinment);
router.put('/update/:id', updateAppoinment);
router.delete('/delete/:id', deleteAppoinment);

module.exports = router;