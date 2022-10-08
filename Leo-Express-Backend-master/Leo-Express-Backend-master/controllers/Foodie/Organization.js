const {
    FoodieOrganizationModel,
    FoodieProductModel,
} = require("../../models/Foodie");
const mongooseObjectId = require("mongoose").Types.ObjectId;
const { response } = require("../../utils/response");

const AddOrganization = async (req, res) => {
    /**
     * Body: name, image, email
     */
    if (await FoodieOrganizationModel.exists({ name: req.body.name }))
        return response(res, false, "Duplicate Name");
    const query = new FoodieOrganizationModel({
        name: req.body.name,
        image: req.body.image,
        email: req.body.email,
        admin: req.tokenData._id,
    });
    query.save((err, data) => {
        if (err) throw err;
        response(res, true, "Organization Registered");
    });
};
const UpdateOrganization = (req, res) => {
    /**
     * Body: organizationId, updates:{name, email, image}
     */
    delete req.body.updates["admin"];
    FoodieOrganizationModel.updateOne(
        {
            _id: mongooseObjectId(req.body.organizationId),
            admin: req.tokenData._id,
        },
        {
            $set: req.body.updates,
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Organization Updated");
            else response(res, false, "Unable to update organization");
        }
    );
};
const RemoveOrganization = (req, res) => {
    /**
     * Body: organizationId
     */
    FoodieOrganizationModel.deleteOne(
        {
            _id: mongooseObjectId(req.body.organizationId),
            admin: req.tokenData._id,
        },
        (err, result) => {
            if (err) throw err;
            if (result.deletedCount === 1)
                FoodieProductModel.deleteMany(
                    { organizationId: req.body.organizationId },
                    (err, result1) => {
                        if (err) throw err;
                        response(res, true, "Organization Deleted");
                    }
                );
            else response(res, false, "Unable to delete your organization");
        }
    );
};

const AddFranchise = (req, res) => {
    /**
     * Body: organizationId, address, city, state, country, openTime, closeTime, coordinates
     */
    FoodieOrganizationModel.updateOne(
        {
            _id: mongooseObjectId(req.body.organizationId),
            admin: req.tokenData._id,
        },
        {
            $addToSet: {
                franchise: {
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    openTime: req.body.openTime,
                    closeTime: req.body.closeTime,
                    location: {
                        type: "point",
                        coordinates: req.body.coordinates,
                    },
                },
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Franchise Added");
            else response(res, false, "Unable to add franchise");
        }
    );
};
const UpdateFranchise = (req, res) => {
    /**
     * Body: organizationId, franchiseId, updates
     */
    FoodieOrganizationModel.updateOne(
        {
            _id: mongooseObjectId(req.body.organizationId),
            admin: req.tokenData._id,
            franchise: {
                $elemMatch: {
                    _id: mongooseObjectId(req.body.franchiseId),
                },
            },
        },
        {
            $set: {
                "franchise.$.address": req.body.updates.address,
                "franchise.$.city": req.body.updates.city,
                "franchise.$.state": req.body.updates.state,
                "franchise.$.country": req.body.updates.country,
                "franchise.$.openTime": req.body.updates.openTime,
                "franchise.$.closeTime": req.body.updates.closeTime,
                "franchise.$.location.coordinates":
                    req.body.updates.coordinates,
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Franchise Updated");
            else response(res, false, "Unable to update franchise");
        }
    );
};
const RemoveFranchise = (req, res) => {
    /**
     * Body: organizationId, franchiseId
     */
    FoodieOrganizationModel.updateOne(
        {
            _id: mongooseObjectId(req.body.organizationId),
            admin: req.tokenData._id,
        },
        {
            $pull: {
                franchise: {
                    _id: mongooseObjectId(req.body.franchiseId),
                },
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Franchise Removed");
            else response(res, false, "Unable to remove franchise");
        }
    );
};

const AddPeople = (req, res) => {
    /**
     * Body: organizationId, franchiseId, userId
     */
    FoodieOrganizationModel.updateOne(
        {
            _id: mongooseObjectId(req.body.organizationId),
            admin: req.tokenData._id,
            franchise: {
                $elemMatch: {
                    _id: mongooseObjectId(req.body.franchiseId),
                },
            },
        },
        {
            $addToSet: {
                "franchise.$.people": req.body.userId,
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "User added to Franchise ");
            else response(res, false, "Unable to add user to franchise");
        }
    );
};
const RemovePeople = (req, res) => {
    /**
     * Body: organizationId, franchiseId, userId
     */
    FoodieOrganizationModel.updateOne(
        {
            _id: mongooseObjectId(req.body.organizationId),
            admin: req.tokenData._id,
            franchise: {
                $elemMatch: {
                    _id: mongooseObjectId(req.body.franchiseId),
                },
            },
        },
        {
            $pull: {
                "franchise.$.people": req.body.userId,
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "User removed from Franchise ");
            else response(res, false, "Unable to remove user from franchise");
        }
    );
};

module.exports = {
    AddOrganization,
    UpdateOrganization,
    RemoveOrganization,
    AddFranchise,
    UpdateFranchise,
    RemoveFranchise,
    AddPeople,
    RemovePeople,
};
