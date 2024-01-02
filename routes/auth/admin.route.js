
//  admin register , login , reset pass ,delete , get => router 

const express = require('express');
const router = express.Router();

  
const { registerAdmin , loginAdmin , resetAdminPass , getAllAdmin } = require("../../controllers/auth/admin.controller");
 



router.get('/admins', getAllAdmin); 
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/reset', resetAdminPass); 

module.exports = router;