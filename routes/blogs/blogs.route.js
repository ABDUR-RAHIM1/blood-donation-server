
const express = require('express');  
  
const { getAllBlogs, getOneBlogs, addBlogs , updateBlogs, deleteBlogs } = require("../../controllers/blogs/blog.controller");
const checkAuth = require("../../middlewere/checkAuth");
 
const router = express.Router();  



router.get('/blogs', getAllBlogs );
router.get('/blogs-one', checkAuth , getOneBlogs );
router.post('/blogs', checkAuth, addBlogs ); 
router.put('/blogs/:id', updateBlogs  );
router.delete('/blogs/:id',deleteBlogs  );

module.exports = router;