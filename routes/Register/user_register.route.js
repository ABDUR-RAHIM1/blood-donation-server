//  user register => get , create , update,delete  => router 

const express = require('express');  
 
const checkAuth = require("../../middlewere/checkAuth");
const { getUsers , getSpecificUser , registertUsers,  updatetUsers ,deletetUsersRegister } = require("../../controllers/register/user_register.controller");
 

 
const router = express.Router();  



router.get('/users' , getUsers );
router.get('/users-one', checkAuth, getSpecificUser );
router.post('/register', checkAuth , registertUsers ); 
router.put('/update/:id', updatetUsers );
router.delete('/delete/:id', deletetUsersRegister );

module.exports = router;