const diskStorage = require("multer").diskStorage;
const {
    Post,
    NewPost,
    UpdatePost,
    RemovePost,
    Like,
    LikeComment,
    AddComment,
    RemoveComment,
    Media,
} = require("../controllers/Instagram/Post");
const {
    Register,
    Profile,
    ProfileIcon,
    Bio,
    Follow,
    ApproveFollow,
    RejectFollow,
    UnFollow,
    GetFollower,
    GetFollowing,
    GetPendingFollow,
    ProfileMedia,
} = require("../controllers/Instagram/Account");
const { decodeToken } = require("../utils/token");
const uploadProfile = require("multer")({
    limits: { fileSize: 1024 * 512 },
    storage: diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/instagram/profile");
        },
        filename: function (req, file, cb) {
            cb(null, req.tokenData._id + ".jpg");
        },
    }),
});
const uploadPost = require("multer")({
    limits: { fileSize: 1024 * 512 },
    storage: diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/instagram/post");
        },
        filename: function (req, file, cb) {
            cb(null, req.tokenData._id + Date.now() + ".jpg");
        },
    }),
});
const InstaRoute = require("express").Router();

InstaRoute.post("/register", decodeToken, Register);
InstaRoute.get("/profile", decodeToken, Profile);
InstaRoute.post(
    "/profile/icon",
    decodeToken,
    uploadProfile.single("avatar"),
    ProfileIcon
);
InstaRoute.post("/bio", decodeToken, Bio);
InstaRoute.post("/follow", decodeToken, Follow);
InstaRoute.delete("/follow", decodeToken, UnFollow);
InstaRoute.post("/follow/request", decodeToken, ApproveFollow);
InstaRoute.delete("/follow/request", decodeToken, RejectFollow);
InstaRoute.get("/follower", decodeToken, GetFollower);
InstaRoute.get("/following", decodeToken, GetFollowing);
InstaRoute.get("/pendingfollow", decodeToken, GetPendingFollow);
InstaRoute.get("/media/profile", decodeToken, ProfileMedia);
// Post
InstaRoute.get("/post", decodeToken, Post);
InstaRoute.post("/post", decodeToken, uploadPost.array("photos", 3), NewPost);
InstaRoute.put("/post", decodeToken, UpdatePost);
InstaRoute.delete("/post", decodeToken, RemovePost);
InstaRoute.post("/like/post", decodeToken, Like);
InstaRoute.post("/like/comment", decodeToken, LikeComment);
InstaRoute.post("/comment", decodeToken, AddComment);
InstaRoute.delete("/comment", decodeToken, RemoveComment);
InstaRoute.get("/media/post", decodeToken, Media);

module.exports = InstaRoute;
