const {
    Blog,
    NewBlog,
    UpdateBlog,
    RemoveBlog,
    LikeBlog,
} = require("../controllers/Blog");
const { decodeToken } = require("../utils/token");
const BlogRoute = require("express").Router();

BlogRoute.get("/", Blog);
BlogRoute.post("/", decodeToken, NewBlog);
BlogRoute.put("/", decodeToken, UpdateBlog);
BlogRoute.delete("/", decodeToken, RemoveBlog);
BlogRoute.post("/like", decodeToken, LikeBlog);

module.exports = BlogRoute;
