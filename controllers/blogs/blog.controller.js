const blogsModel = require("../../models/blogs/blog.model")


const getAllBlogs = async (req, res) => {

    try {
        const blogs = await blogsModel.find();
        res.status(200).json({
            blogs
        })
    } catch (error) {
        res.status(500).json({
            message: "Cannot get Blogs",
            error: error.message
        })
    }
}

const getOneBlogs = async (req, res) => {
    const { name, email } = req.user;

    try {
        const blogs = await blogsModel.find({ name, email });
        res.status(200).json({ blogs })
    } catch (error) {
        res.status(500).json({
            message: "Cannot Get Your Blogs",
            error: error.message
        })
    }
}


const addBlogs = async (req, res) => {

    const { user } = req;
    try {
        const { title, desc, profilePic } = req.body;
        const newBlog = await blogsModel({
            name: user.name,
            email: user.email,
            role: user.role,
            title,
            desc,
            profilePic
        });

        const blogs = await newBlog.save();
        res.status(201).json({
            message: "Add Your Blog Successful"
        })

    } catch (error) {
        res.status(500).json({
            message: "Blog Not Create",
            error: error.message
        })
    }

}


const updateBlogs = async (req, res) => {

    const { id } = req.params; 
    try {
        await blogsModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });
        res.status(200).json({
            message: "Blog has been updated",
        })
    } catch (error) {
        res.status(500).json({
            message: "Somthing mistake",
            error: error.message
        })
    }
}


const deleteBlogs = async (req, res) => {
    const { id } = req.params;
    const isBlog = await blogsModel.findOne({ _id: id })
    try {
        if (isBlog) {
            await blogsModel.findByIdAndDelete({ _id: id });
            res.status(200).json({
                message: "Blog has been Deleted"
            })
        }else{
            res.status(200).json({
                message: "Already deleted this Blog"
            }) 
        }
    } catch (error) {
        res.status(500).json({
            message: "Somthing mistake",
            error: error.message
        })
    }
}

module.exports = { getAllBlogs, getOneBlogs, addBlogs, updateBlogs, deleteBlogs }