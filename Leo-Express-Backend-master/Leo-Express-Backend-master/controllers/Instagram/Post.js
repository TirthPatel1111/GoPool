const {
    InstagramPostModel,
    InstagramAccountModel,
} = require("../../models/Instagram");
const { response } = require("../../utils/response");
const pathResolve = require("path").resolve;
const fsUnlink = require("fs").unlink;
const mongooseObjectId = require("mongoose").Types.ObjectId;

const Post = (req, res) => {};

const NewPost = (req, res) => {
    const query = new InstagramPostModel({
        userId: req.tokenData._id,
        images: req.files.map((ele) => {
            return ele.filename;
        }),
        caption: req.body.caption,
        people: req.body.people,
        location: req.body.location,
    });
    query.save((err, result) => {
        if (err) throw err;
        InstagramAccountModel.updateOne(
            { userId: mongooseObjectId(req.tokenData._id) },
            { $push: { posts: result._id } },
            (err, result1) => {
                if (err) throw err;
                response(res, true, "New Post Added");
            }
        );
    });
};
const UpdatePost = (req, res) => {
    InstagramAccountModel.updateOne(
        { userId: mongooseObjectId(req.tokenData._id) },
        {
            caption: req.body.caption,
            people: req.body.people,
            location: req.body.location,
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1) response(res, true, "Post Updated");
            else response(res, false, "Unable to Update Post");
        }
    );
};
const RemovePost = (req, res) => {
    InstagramPostModel.findOneAndDelete(
        {
            _id: mongooseObjectId(req.body.postId),
            userId: mongooseObjectId(req.tokenData._id),
        },
        (err, result) => {
            if (err) throw err;
            if (result)
                InstagramAccountModel.updateOne(
                    { userId: mongooseObjectId(req.tokenData._id) },
                    { $pull: { posts: mongooseObjectId(req.body.postId) } },
                    (err, result1) => {
                        if (err) throw err;
                        if (result1.modifiedCount === 1) {
                            result.images.forEach((ele) => {
                                fsUnlink(
                                    pathResolve(
                                        __dirname +
                                            "/../../uploads/instagram/post/" +
                                            ele
                                    ),
                                    () => {}
                                );
                            });
                            response(res, true, "Post Removed");
                        } else response(res, false, "Unable to Delete post");
                    }
                );
            else response(res, false, "Unable to remove post");
        }
    );
};
const Like = (req, res) => {
    InstagramPostModel.findOne(
        { _id: mongooseObjectId(req.body.postId) },
        { likes: 1 },
        (err, result) => {
            if (err) throw err;
            var query = {};
            if (result.likes.includes(req.tokenData._id))
                query = { $pull: { likes: req.tokenData._id } };
            else query = { $addToSet: { likes: req.tokenData._id } };
            InstagramPostModel.updateOne(
                { _id: mongooseObjectId(req.body.postId) },
                query,
                (err, result1) => {
                    if (err) throw err;
                    if (result1.modifiedCount === 1)
                        response(res, true, "like toggled");
                    else response(res, false, "Somethig went wrong");
                }
            );
        }
    );
};
const LikeComment = (req, res) => {
    /**
     * BODY: postId, commentId
     */
    InstagramPostModel.findOne(
        { _id: mongooseObjectId(req.body.postId) },
        { comments: 1 },
        (err, result) => {
            if (err) throw err;
            var query = {};
            if (
                result.comments.some((ele) => {
                    return (
                        String(ele._id) === req.body.commentId &&
                        ele.likes.includes(req.tokenData._id)
                    );
                })
            )
                query = { $pull: { "comments.$.likes": req.tokenData._id } };
            else
                query = {
                    $addToSet: { "comments.$.likes": req.tokenData._id },
                };
            InstagramPostModel.updateOne(
                {
                    _id: mongooseObjectId(req.body.postId),
                    comments: {
                        $elemMatch: {
                            _id: req.body.commentId,
                        },
                    },
                },
                query,
                (err, result1) => {
                    if (err) throw err;
                    if (result1.modifiedCount === 1)
                        response(res, true, "like toggled");
                    else response(res, false, "Somethig went wrong");
                }
            );
        }
    );
};
const AddComment = (req, res) => {
    InstagramPostModel.updateOne(
        { _id: mongooseObjectId(req.body.postId) },
        {
            $addToSet: {
                comments: {
                    userId: req.tokenData._id,
                    comment: req.body.comment,
                    likes: [],
                },
            },
        },
        (err, result1) => {
            if (err) throw err;
            if (result1.modifiedCount === 1)
                response(res, true, "Comment added to post");
            else response(res, false, "Unable to comment to the post");
        }
    );
};
const RemoveComment = (req, res) => {
    console.log(req.body, req.tokenData);
    InstagramPostModel.updateOne(
        { _id: mongooseObjectId(req.body.postId) },
        {
            $pull: {
                comments: {
                    _id: mongooseObjectId(req.body.commentId),
                    userId: mongooseObjectId(req.tokenData._id),
                },
            },
        },
        (err, result1) => {
            if (err) throw err;
            if (result1.modifiedCount === 1)
                response(res, true, "Comment removed from post");
            else response(res, false, "Unable to remove comment from post");
        }
    );
};
const Media = (req, res) => {
    res.sendFile(
        pathResolve(
            __dirname + "/../../uploads/instagram/post/" + req.query.name
        )
    );
};
module.exports = {
    Post,
    NewPost,
    UpdatePost,
    RemovePost,
    Like,
    LikeComment,
    AddComment,
    RemoveComment,
    Media,
};
