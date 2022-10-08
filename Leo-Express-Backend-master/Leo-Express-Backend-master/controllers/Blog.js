const BlogModel = require("../models/Blog");
const { response } = require("../utils/response");
const mongooseObjectId = require("mongoose").Types.ObjectId;

const Blog = (req, res) => {
    BlogModel.find({}, (err, data) => {
        if (err) throw err;
        response(res, true, "Blog Found", data);
    });
};
const NewBlog = async (req, res) => {
    /**
     * Body: title, description, tags
     */
    const query = new BlogModel({
        title: req.body.title,
        userId: req.tokenData._id,
        description: req.body.description,
        tags: req.body.tags,
    });
    query.save((err, result) => {
        if (err) throw err;
        response(res, true, "Blog Added");
    });
};
const UpdateBlog = (req, res) => {
    /**
     * Body: blogId, title, description, tags
     */
    BlogModel.updateOne(
        {
            _id: mongooseObjectId(req.body.blogId),
            userId: mongooseObjectId(req.tokenData._id),
        },
        {
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1) response(res, true, "Blog Updated");
            else response(res, false, "Unable to update blog");
        }
    );
};
const RemoveBlog = async (req, res) => {
    /**
     * Body: blogId
     */
    BlogModel.deleteOne(
        {
            _id: mongooseObjectId(req.body.blogId),
            userId: req.tokenData._id,
        },
        (err, result) => {
            if (err) throw err;
            if (result.deletedCount === 1) response(res, true, "Blog Removed");
            else response(res, false, "Unable to remove blog");
        }
    );
};
const LikeBlog = async (req, res) => {
    /**
     * BODY: blogId
     */
    var query = {};
    if (
        await BlogModel.exists({
            _id: mongooseObjectId(req.body.blogId),
            likes: { $in: req.tokenData._id },
        })
    )
        query = { $pull: { likes: req.tokenData._id } };
    else query = { $addToSet: { likes: req.tokenData._id } };
    BlogModel.updateOne(
        {
            _id: mongooseObjectId(req.body.blogId),
        },
        query,
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "toggled like for blog");
            else response(res, false, "Unable to toggle like for blog");
        }
    );
};

module.exports = { Blog, NewBlog, UpdateBlog, RemoveBlog, LikeBlog };
