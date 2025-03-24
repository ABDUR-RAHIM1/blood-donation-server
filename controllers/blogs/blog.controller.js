const blogsModel = require("../../models/blogs/blog.model")


const getAllBlogs = async (req, res) => {

    try {
        const blogs = await blogsModel.find();
        res.status(200).json(blogs)
        
    } catch (error) {
        res.status(500).json({
            message: "Cannot get Blogs",
            error: error.message
        })
    }
}

const getOneBlogs = async (req, res) => {
    const { userId } = req.user;

    try {
        const blogs = await blogsModel.find({ userId });
        res.status(200).json(blogs)
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
        const { title, desc, photo } = req.body;
        const newBlog = await blogsModel({
            userId: user.userId,
            name: user.name,
            email: user.email,
            role: user.role,
            title,
            desc,
            photo
        });

        const blogs = await newBlog.save();
        res.status(201).json({
            message: "Post successful",
            ok: true
        })

    } catch (error) {
        res.status(500).json({
            message: "Post Failed",
            ok: false,
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
            message: "Post has been updated",
            ok: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Somthing mistake",
            error: error.message,
            ok: false
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
                message: "Blog has been Deleted",
                ok: true
            })
        } else {
            res.status(200).json({
                message: "Already deleted this Blog",
                ok: false
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Somthing mistake",
            error: error.message,
            ok: false
        })
    }
}

module.exports = { getAllBlogs, getOneBlogs, addBlogs, updateBlogs, deleteBlogs }