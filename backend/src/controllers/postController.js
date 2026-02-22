const Post = require("../models/postModel");
const imagekit = require("../services/imagekit");

const createPost = async (req, res) => {
    try {
        const file = req.file;
        const { caption } = req.body;
        const result = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: "images",
        })
        const newPost = await Post.create({
            image: result.url,
            caption,
        });

        res.json({
            success: true,
            image: result.url,
            newPost
        });


    } catch (error) {
        console.log(error.message)
    }

}

const getPost=async (req,res) => {
    try {
        const postData=await Post.find({})
        if(!postData){
            return res.json({success:false,message:"Post not found"})
        }
        return res.json({success:true,postData})
    } catch (error) {
        console.log(error.message)
    }
    
}

module.exports = {
    createPost,getPost
}