const express=require('express');
const upload = require('../services/multer');
const { createPost, getPost } = require('../controllers/postController');

const image=express.Router();

image.post('/create-post',upload.single('image'),createPost)
image.get('/get-post',getPost)

module.exports=image

