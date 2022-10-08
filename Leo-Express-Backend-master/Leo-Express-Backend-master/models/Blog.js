const db = require("../db");
const mongooseSchema = require("mongoose").Schema;
const mongooseObjectId = require("mongoose").Types.ObjectId;

const BlogModel = db.model(
    "Blog",
    new mongooseSchema({
        title: { type: String, required: true },
        userId: { type: mongooseObjectId, required: true },
        tags: { type: Array, required: false, default: [] },
        description: { type: String, required: true },
        datetime: { type: Number, required: false, default: Date.now() },
        likes: { type: Array, required: false, default: [] },
    }),
    "Blog"
);

module.exports = BlogModel;
