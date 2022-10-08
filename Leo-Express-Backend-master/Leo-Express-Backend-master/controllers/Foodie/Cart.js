const { FoodieCartModel } = require("../../models/Foodie");
const { response } = require("../../utils/response");

const AddCart = async (req, res) => {
    /**
     * Body: productId, sizeId, qty
     */
    if ((await FoodieCartModel.exists({ userId: req.tokenData._id })) === null)
        await createCart(req.tokenData._id);
    FoodieCartModel.updateOne(
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
     * Body: productId, sizeId, qty
     */
    FoodieCartModel.updateOne(
        {
            userId: req.tokenData._id,
            cart: {
                $elemMatch: {
                    productId: req.body.productId,
                    sizeId: req.body.sizeId,
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
     * Body: productId, sizeId
     */
    if ((await FoodieCartModel.exists({ userId: req.tokenData._id })) === null)
        await createCart(req.tokenData._id);
    FoodieCartModel.updateOne(
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
    const query = new FoodieCartModel({ userId });
    await query.save();
};

module.exports = { AddCart, UpdateQty, RemoveCart };
