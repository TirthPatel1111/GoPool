const db = require("../db");
const mongooseSchema = require("mongoose").Schema;
const mongooseObjectId = require("mongoose").Types.ObjectId;

const InstagramAccountModel = db.model(
    "InstagramAccount",
    new mongooseSchema({
        userId: { type: mongooseObjectId, reqired: true },
        username: { type: String, required: true, unique: true },
        name: { type: String, reqired: true },
        bio: { type: String, reqired: false, default: "" },
        locked: { type: Boolean, required: false, default: false },
        profileIcon: { type: String, reqired: false, default: null },
        posts: { type: Array, reqired: false, default: [] },
        followers: { type: Array, reqired: false, default: [] },
        following: { type: Array, reqired: false, default: [] },
        pendingFollow: { type: Array, reqired: false, default: [] },
        saved: { type: Array, reqired: false, default: [] },
    }),
    "InstagramAccount"
);
const InstagramPostModel = db.model(
    "InstagramPost",
    new mongooseSchema({
        userId: { type: mongooseObjectId, required: true },
        images: { type: Array, required: false },
        caption: { type: String, required: false, default: null },
        people: { type: Array, required: false, default: [] },
        location: { type: String, required: false, default: null },
        likes: { type: Array, required: false, default: [] },
        comments: [
            {
                userId: { type: mongooseObjectId, required: true },
                comment: { type: String, required: true },
                likes: { type: Array, required: false, default: [] },
            },
        ],
    }),
    "InstagramPost"
);

module.exports = { InstagramAccountModel, InstagramPostModel };
