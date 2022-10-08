const { InstagramAccountModel } = require("../../models/Instagram");
const mongooseObjectId = require("mongoose").Types.ObjectId;
const pathResolve = require("path").resolve;
const { response } = require("../../utils/response");

const Register = async (req, res) => {
    /**
     * BODY: username, name, locked
     */
    if (
        (await InstagramAccountModel.exists({
            userId: mongooseObjectId(req.tokenData._id),
        })) !== null
    )
        response(res, true, "Already Registered");
    else {
        const query = InstagramAccountModel({
            userId: req.tokenData._id,
            username: req.body.username,
            name: req.body.name,
            locked: req.body.locked,
        });
        query.save((err, result) => {
            if (err) throw err;
            response(res, true, "Registration Successful");
        });
    }
};
const Profile = (req, res) => {
    /**
     * BODY: userId
     */
    InstagramAccountModel.findOne(
        { userId: mongooseObjectId(req.query.userId) },
        (err, data) => {
            if (err) throw err;
            if (data.locked && data.follower.includes(req.tokenData._id))
                response(res, true, "Profile Fetched", {
                    name: data.name,
                    bio: data.bio,
                    profileIcon: data.profileIcon,
                    posts: data.posts,
                    followers: data.followers,
                    following: data.following,
                });
            else
                response(res, true, "Profile Fetched", {
                    name: data.name,
                    bio: data.bio,
                    profileIcon: data.profileIcon,
                    posts: data.posts,
                    followers: [],
                    following: [],
                    followerCount: data.followers.length,
                    followingCount: data.following.length,
                });
        }
    );
};
const ProfileIcon = (req, res) => {
    if (req.file) {
        InstagramAccountModel.updateOne(
            { userId: mongooseObjectId(req.tokenData._id) },
            { profileIcon: req.file.filename },
            (err, result) => {
                if (err) throw err;
                if (result.modifiedCount === 1)
                    response(res, true, "Profile Upload Successful");
                else response(res, false, "Unable to update Profile Photo");
            }
        );
    } else response(res, false, "Unable to upload");
};
const Bio = (req, res) => {
    /**
     * BODY: bio
     */
    InstagramAccountModel.updateOne(
        { userId: mongooseObjectId(req.tokenData._id) },
        { bio: req.body.bio },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1) response(res, true, "Bio Updated");
            else response(res, false, "Unable to update Bio");
        }
    );
};
const Follow = async (req, res) => {
    /**
     * BODY: userId
     */
    InstagramAccountModel.findOne(
        { userId: mongooseObjectId(req.body.userId) },
        { following: 1, pendingFollow: 1, locked: 1 },
        (err, result) => {
            if (err) throw err;
            if (result.following.includes(req.tokenData._id))
                response(
                    res,
                    false,
                    "You are alreading following this profile"
                );
            else if (result.pendingFollow.includes(req.tokenData._id))
                response(res, false, "Already request to follow");
            else if (locked)
                InstagramAccountModel.updateOne(
                    { userId: mongooseObjectId(req.tokenData._id) },
                    {
                        $addToSet: { followers: req.body.userId },
                    },
                    (err, result) => {
                        if (err) throw err;
                        if (result.modifiedCount === 1)
                            InstagramAccountModel.updateOne(
                                { userId: mongooseObjectId(req.body.userId) },
                                { $addToSet: { following: req.tokenData._id } },
                                (err, result1) => {
                                    if (err) throw err;
                                    if (result1.modifiedCount === 1)
                                        response(res, true, "Follow Accepted");
                                    else
                                        response(
                                            res,
                                            false,
                                            "Unable to accept Follow"
                                        );
                                }
                            );
                        else response(res, false, "Unable to accept Follow");
                    }
                );
            else
                InstagramAccountModel.updateOne(
                    { userId: mongooseObjectId(req.body.userId) },
                    { $push: { pendingFollow: req.tokenData._id } },
                    (err, result) => {
                        if (err) throw err;
                        if (result.modifiedCount === 1)
                            response(res, true, "Follow request sent");
                        else
                            response(
                                res,
                                false,
                                "Unable to send follow request"
                            );
                    }
                );
        }
    );
};
const ApproveFollow = (req, res) => {
    /**
     * BODY: userId
     */
    InstagramAccountModel.findOne(
        { userId: mongooseObjectId(req.tokenData._id) },
        {
            pendingFollow: 1,
        },
        (err, result0) => {
            if (err) throw err;
            if (result0.pendingFollow.includes(req.body.userId)) {
                InstagramAccountModel.updateOne(
                    { userId: mongooseObjectId(req.tokenData._id) },
                    {
                        $pull: { pendingFollow: req.body.userId },
                        $addToSet: { followers: req.body.userId },
                    },
                    (err, result) => {
                        if (err) throw err;
                        if (result.modifiedCount === 1)
                            InstagramAccountModel.updateOne(
                                { userId: mongooseObjectId(req.body.userId) },
                                { $addToSet: { following: req.tokenData._id } },
                                (err, result1) => {
                                    if (err) throw err;
                                    if (result1.modifiedCount === 1)
                                        response(res, true, "Follow Accepted");
                                    else
                                        response(
                                            res,
                                            false,
                                            "Unable to accept Follow"
                                        );
                                }
                            );
                        else response(res, false, "Unable to accept Follow");
                    }
                );
            } else response(res, false, "Unable to approve follow");
        }
    );
};
const RejectFollow = (req, res) => {
    /**
     * BODY: userId
     */
    InstagramAccountModel.updateOne(
        { userId: mongooseObjectId(req.tokenData._id) },
        { $pull: { pendingFollow: req.body.userId } },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Follow Rejected");
            else response(res, false, "Unable to reject follow");
        }
    );
};
const UnFollow = (req, res) => {
    /**
     * BODY: userId
     */
    InstagramAccountModel.updateOne(
        { userId: mongooseObjectId(req.body.userId) },
        {
            $pull: {
                followers: req.tokenData._id,
                pendingFollow: req.tokenData._id,
            },
        },
        (err, result1) => {
            if (err) throw err;
            if (result1.modifiedCount === 1)
                InstagramAccountModel.updateOne(
                    { userId: mongooseObjectId(req.tokenData._id) },
                    {
                        $pull: { following: req.body.userId },
                    },
                    (err, result) => {
                        if (err) throw err;
                        if (
                            result.modifiedCount === 1 ||
                            result1.modifiedCount === 1
                        )
                            response(res, true, "Unfollowed");
                        else response(res, false, "Unable to unfollow");
                    }
                );
            else response(res, false, "Unable to unFollow");
        }
    );
};
const GetFollower = (req, res) => {
    /**
     * BODY: followers
     */
    InstagramAccountModel.find(
        {
            $includes: { userId: req.body.followers },
        },
        { username: 1, userId: 1, profileIcon: 1 },
        (err, data) => {
            if (err) throw err;
            response(res, true, "Followers fetched", data);
        }
    );
};
const GetFollowing = (req, res) => {
    /**
     * BODY: following
     */
    InstagramAccountModel.find(
        {
            $includes: { userId: req.body.following },
        },
        { username: 1, userId: 1, profileIcon: 1 },
        (err, data) => {
            if (err) throw err;
            response(res, true, "Following fetched", data);
        }
    );
};
const GetPendingFollow = (req, res) => {
    InstagramAccountModel.find(
        {
            userId: mongooseObjectId(req.tokenData._id),
        },
        { pendingFollow: 1 },
        (err, data) => {
            if (err) throw err;
            response(res, true, "Pending Follow Fetched", data);
        }
    );
};
const ProfileMedia = () => {
    res.sendFile(
        pathResolve(
            __dirname + "/../../uploads/instagram/profile/" + req.query.name
        )
    );
};

module.exports = {
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
};
