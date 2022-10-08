const { StoreCartModel } = require("../../models/Store");
const { response } = require("../../utils/response");

const AddCart = async (req, res) => {
    /**
     * Body: productId, optionId, qty
     */
    if ((await StoreCartModel.exists({ userId: req.tokenData._id })) === null)
        await createCart(req.tokenData._id);
    StoreCartModel.updateOne(
        { userId: req.tokenData._id },
        { $addToSet: { cart: req.body } },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Added to cart");
            else response(res, false, "Unable to add to cart");
        }
    );
};
const UpdateQty = (req, res) => {
    /**
     * Body: productId, optionId, qty
     */
    StoreCartModel.updateOne(
        {
            userId: req.tokenData._id,
            cart: {
                $elemMatch: {
                    productId: req.body.productId,
                    optionId: req.body.optionId,
                },
            },
        },
        { $set: { "cart.$.qty": req.body.qty } },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Quantity updated");
            else response(res, false, "Unable to update quantity");
        }
    );
};
const RemoveCart = async (req, res) => {
    /**
     * Body: productId, optionId
     */
    if ((await StoreCartModel.exists({ userId: req.tokenData._id })) === null)
        await createCart(req.tokenData._id);
    StoreCartModel.updateOne(
        { userId: req.tokenData._id },
        { $pull: { cart: req.body } },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Removed from cart");
            else response(res, false, "Unable to remove from cart");
        }
    );
};
// Helper Function
const createCart = async (userId) => {
    const query = new StoreCartModel({ userId });
    await query.save();
};

module.exports = { AddCart, UpdateQty, RemoveCart };
