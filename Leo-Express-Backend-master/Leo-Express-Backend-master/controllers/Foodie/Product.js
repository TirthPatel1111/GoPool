const {
    FoodieProductModel,
    FoodieOrganizationModel,
} = require("../../models/Foodie");
const { response } = require("../../utils/response");
const mongooseObjectId = require("mongoose").Types.ObjectId;
const msg = "you are not authorized";

const AddProduct = async (req, res) => {
    /**
     * Body: organizationId, [image], name, buyQtyLimit, [ingredients], category, veg, spiceLevel, {availableSizes}
     */
    if (
        !(await FoodieOrganizationModel.exists({
            _id: mongooseObjectId(req.body.organizationId),
            admin: req.tokenData._id,
        }))
    )
        response(res, false, msg);
    else {
        const query = new FoodieProductModel({
            organizationId: req.body.organizationId,
            image: req.body.image,
            name: req.body.name,
            buyQtyLimit: req.body.buyQtyLimit,
            ingredients: req.body.ingredients,
            category: req.body.category,
            veg: req.body.veg,
            spiceLevel: req.body.spiceLevel,
            availableSizes: req.body.availableSizes,
        });
        query.save((err, data) => {
            if (err) throw err;
            response(res, true, "Product Added Successfully", data);
        });
    }
};
const UpdateProduct = async (req, res) => {
    /**
     * Body: productId, organizationId, updates
     */
    if (
        !(await FoodieOrganizationModel.exists({
            _id: mongooseObjectId(req.body.organizationId),
            admin: req.tokenData._id,
        }))
    )
        response(res, false, msg);
    else {
        delete req.body.updates["availableSizes"];
        delete req.body.updates["rating"];
        delete req.body.updates["organizationId"];
        FoodieProductModel.updateOne(
            {
                _id: mongooseObjectId(req.body.productId),
                organizationId: mongooseObjectId(req.body.organizationId),
            },
            req.body.updates,
            (err, result) => {
                if (err) throw err;
                if (result.modifiedCount === 1)
                    response(res, true, "Product Updated Successfully");
                else response(rs, false, "Unable to update your product");
            }
        );
    }
};
const RemoveProduct = async (req, res) => {
    /**
     * Body: productId, organizationId
     */
    if (
        !(await FoodieOrganizationModel.exists({
            _id: mongooseObjectId(req.body.organizationId),
            admin: req.tokenData._id,
        }))
    )
        response(res, false, msg);
    else {
        FoodieProductModel.deleteOne(
            {
                _id: mongooseObjectId(req.body.productId),
                organizationId: mongooseObjectId(req.body.organizationId),
            },
            (err, result) => {
                if (err) throw err;
                if (result.deletedCount === 1)
                    response(res, true, "Product Removed");
                else response(res, false, "Unable to remove Product");
            }
        );
    }
};
const AddSize = async (req, res) => {
    /**
     * Body: organizationId, productId, data, price, name
     */
    if (
        !(await FoodieOrganizationModel.exists({
            _id: mongooseObjectId(req.body.organizationId),
            admin: req.tokenData._id,
        }))
    )
        response(res, false, msg);
    else {
        FoodieProductModel.updateOne(
            {
                _id: mongooseObjectId(req.body.productId),
                organizationId: mongooseObjectId(req.body.organizationId),
            },
            {
                $addToSet: {
                    availableSizes: {
                        name: req.body.name,
                        data: req.body.data,
                        price: req.body.price,
                    },
                },
            },
            (err, result) => {
                if (err) throw err;
                if (result.modifiedCount === 1)
                    response(res, true, "Size Added");
                else response(res, false, "Unable to add size");
            }
        );
    }
};
const UpdateSize = async (req, res) => {
    /**
     * Body: organizationId, productId, sizeId, name, data, price
     */
    if (
        !(await FoodieOrganizationModel.exists({
            _id: mongooseObjectId(req.body.organizationId),
            admin: req.tokenData._id,
        }))
    )
        response(res, false, msg);
    else {
        FoodieProductModel.updateOne(
            {
                _id: mongooseObjectId(req.body.productId),
                organizationId: mongooseObjectId(req.body.organizationId),
                availableSizes: {
                    $elemMatch: { _id: mongooseObjectId(req.body.sizeId) },
                },
            },
            {
                $set: {
                    "availableSizes.$.name": req.body.name,
                    "availableSizes.$.data": req.body.data,
                    "availableSizes.$.price": req.body.price,
                },
            },
            (err, result) => {
                if (err) throw err;
                if (result.modifiedCount === 1)
                    response(res, true, "Size Updated");
                else response(res, false, "Unable to update size");
            }
        );
    }
};
const RemoveSize = async (req, res) => {
    /**
     * Body: organizationId, productId, sizeId
     */
    if (
        !(await FoodieOrganizationModel.exists({
            _id: mongooseObjectId(req.body.organizationId),
            admin: req.tokenData._id,
        }))
    )
        response(res, false, msg);
    else {
        FoodieProductModel.updateOne(
            {
                _id: mongooseObjectId(req.body.productId),
                organizationId: mongooseObjectId(req.body.organizationId),
            },
            {
                $pull: {
                    availableSizes: {
                        _id: mongooseObjectId(req.body.sizeId),
                    },
                },
            },
            (err, result) => {
                if (err) throw err;
                if (result.modifiedCount === 1)
                    response(res, true, "Size Removed");
                else response(res, false, "Unable to remove size");
            }
        );
    }
};
module.exports = {
    AddProduct,
    UpdateProduct,
    RemoveProduct,
    AddSize,
    UpdateSize,
    RemoveSize,
};
