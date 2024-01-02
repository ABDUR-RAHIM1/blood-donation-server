
//  user  register , login , reset pass ,delete , get => router 

const express = require('express');
const router = express.Router();

 
const { getUsers , getOneUser , registerUsers , loginUsers ,resetUserPassword , deleteUsers } = require("../../controllers/auth/user.controller");
const checkAuth = require("../../middlewere/checkAuth");
 
 

router.get('/users', getUsers);
router.get('/users-one', checkAuth , getOneUser);
router.post('/register', registerUsers);
router.post('/login', loginUsers);
router.post('/reset', resetUserPassword);
router.delete('/delete/:id', deleteUsers);

module.exports = router;