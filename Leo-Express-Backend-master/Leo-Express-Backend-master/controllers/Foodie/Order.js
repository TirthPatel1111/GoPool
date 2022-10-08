const { FoodieCartModel, FoodieOrderModel } = require("../../models/Foodie");
const mongooseObjectId = require("mongoose").Types.ObjectId;
const { response } = require("../../utils/response");

const PlaceOrder = (req, res) => {
    /**
     * Body: txnId, type, amount
     */
    FoodieCartModel.findOne(
        { userId: req.tokenData._id },
        { cart: 1 },
        (err, result) => {
            if (err) throw err;
            const query = new FoodieOrderModel({
                userId: req.tokenData._id,
                status: "pending",
                order: result.cart,
                type: req.body.type,
                payment: {
                    txnId: req.body.payment.txnId,
                    type: req.body.payment.type,
                    amount: req.body.payment.amount,
                },
                address: {
                    al1: req.body.address.al1,
                    al2: req.body.address.al2,
                    city: req.body.address.city,
                    state: req.body.address.state,
                    country: req.body.address.country,
                    location: {
                        type: "point",
                        coordinates: req.body.address.coordinates,
                    },
                },
            });
            query.save((err, result1) => {
                if (err) throw err;
                FoodieCartModel.updateOne(
                    { userId: req.tokenData._id },
                    { $set: { cart: [] } },
                    (err, result2) => {
                        if (err) throw err;
                        if (result2.modifiedCount === 1)
                            response(res, true, "Order Placed");
                        else response(res, false, "Unable to Place your Order");
                    }
                );
            });
        }
    );
};
const CancelOrder = (req, res) => {
    /**
     * Body: orderId
     */
    FoodieOrderModel.updateOne(
        {
            _id: mongooseObjectId(req.body.orderId),
            userId: req.tokenData._id,
            status: "pending",
            deliveryDate: null,
            cancelDate: null,
        },
        {
            $set: {
                status: "cancelled",
                cancelDate: Date.now(),
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Order Cancelled");
            else response(res, false, "Unable to cancel your order");
        }
    );
};

module.exports = { PlaceOrder, CancelOrder };
