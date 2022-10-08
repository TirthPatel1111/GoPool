const { StoreProductModel, StoreMerchantModel } = require("../../models/Store");
const { response } = require("../../utils/response");
const mongooseObjectId = require("mongoose").Types.ObjectId;

const NewProduct = (req, res) => {
    /**
     * Body: name, options:{data, price, availableStock}, [descriptions], [images], {specs}, [offers]
     */
    const query = new StoreProductModel({
        name: req.body.name,
        options: req.body.options,
        description: req.body.description || [],
        images: req.body.images || [],
        specs: req.body.specs || {},
        soldBy: req.tokenData.merchantId,
        offers: req.body.offers || [],
    });
    query.save((err, data) => {
        if (err) throw err;
        response(res, true, "Product Added Successfully", data);
    });
};
const UpdateProduct = (req, res) => {
    /**
     * Body: productId, updates
     */
    delete req.body.updates["soldBy"];
    StoreProductModel.updateOne(
        {
            _id: mongooseObjectId(req.body.productId),
            soldBy: req.tokenData.merchantId,
        },
        req.body.updates,
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Product Updated Successfully");
            else response(rs, false, "Unable to update your product");
        }
    );
};
const DeleteProduct = async (req, res) => {
    /**
     * Body: productId
     */
    StoreProductModel.deleteOne(
        {
            _id: mongooseObjectId(req.body.productId),
            soldBy: req.tokenData.merchantId,
        },
        (err, result) => {
            if (err) throw err;
            if (result.deletedCount === 1)
                response(res, true, "Product Removed");
            else response(res, false, "Unable to remove Product");
        }
    );
};
const UpdateAvailableStock = (req, res) => {
    /**
     * BODY: productId, optionId, availableStock
     */
    StoreProductModel.updateOne(
        {
            _id: mongooseObjectId(req.body.productId),
            soldBy: req.tokenData.merchantId,
            options: {
                $elemMatch: { _id: mongooseObjectId(req.body.optionId) },
            },
        },
        { $set: { "options.$.availableStock": req.body.availableStock } },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Stock Updated Successfully");
            else response(res, false, "Unable to update your stock");
        }
    );
};
const AddOption = (req, res) => {
    /**
     * Body: productId, data, price, availableStock
     */
    StoreProductModel.updateOne(
        {
            _id: mongooseObjectId(req.body.productId),
            soldBy: req.tokenData.merchantId,
        },
        {
            $addToSet: {
                options: {
                    data: req.body.data,
                    price: req.body.price,
                    availableStock: req.body.availableStock,
                },
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1) response(res, true, "Option Added");
            else response(res, false, "Unable to add options");
        }
    );
};
const UpdateOption = (req, res) => {
    /**
     * Body: productId, optionId, data, price
     */
    StoreProductModel.updateOne(
        {
            productId: mongooseObjectId(req.body.productId),
            soldBy: req.tokenData.merchantId,
            options: {
                $elemMatch: { _id: mongooseObjectId(req.body.optionId) },
            },
        },
        {
            $set: {
                "options.$.data": req.body.data,
                "options.$.price": req.body.price,
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Option Updated");
            else response(res, false, "Unable to update option");
        }
    );
};
const RemoveOption = (req, res) => {
    /**
     * Body: productId, optionId
     */
    StoreProductModel.updateOne(
        {
            productId: mongooseObjectId(req.body.productId),
            soldBy: req.tokenData.merchantId,
        },
        {
            $pull: {
                options: {
                    _id: mongooseObjectId(req.body.optionId),
                },
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Option Removed");
            else response(res, false, "Unable to remove option");
        }
    );
};

module.exports = {
    NewProduct,
    UpdateProduct,
    DeleteProduct,
    UpdateAvailableStock,
    AddOption,
    UpdateOption,
    RemoveOption,
};
