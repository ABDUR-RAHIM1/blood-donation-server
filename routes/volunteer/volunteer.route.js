
const express = require('express');  
  
const checkAuth = require("../../middlewere/checkAuth");
const { getVolunteer,getAddVolunteer,addVolunteer, updateVolunteer, deleteVolunteer } = require("../../controllers/volunteer/volunteer");

const router = express.Router();  

router.get('/volunteer', getVolunteer );
router.get('/volunteer-one', checkAuth , getAddVolunteer );
router.post('/volunteer-add', checkAuth, addVolunteer ); 
router.put('/update/:id', updateVolunteer  );
router.delete('/delete/:id',deleteVolunteer  );

module.exports = router;