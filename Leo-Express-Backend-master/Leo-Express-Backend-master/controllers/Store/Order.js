const { StoreCartModel, StoreOrderModel } = require("../../models/Store");
const mongooseObjectId = require("mongoose").Types.ObjectId;
const { response } = require("../../utils/response");

const Order = (req, res) => {};
const PlaceOrder = (req, res) => {
    /**
     * Body: txnId, type, amount
     */
    StoreCartModel.findOne(
        { userId: req.tokenData._id },
        { cart: 1 },
        (err, result) => {
            if (err) throw err;
            const query = new StoreOrderModel({
                userId: req.tokenData._id,
                status: "pending",
                order: result.cart,
                payment: {
                    txnId: req.body.txnId,
                    type: req.body.type,
                    amount: req.body.amount,
                },
            });
            query.save((err, result1) => {
                if (err) throw err;
                StoreCartModel.updateOne(
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
    StoreOrderModel.updateOne(
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
const PendingOrder = (req, res) => {};
const UpdateOrder = (req, res) => {};

module.exports = { Order, PlaceOrder, CancelOrder, PendingOrder, UpdateOrder };
