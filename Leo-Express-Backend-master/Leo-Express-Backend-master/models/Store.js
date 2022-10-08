const db = require("../db");
const mongooseSchema = require("mongoose").Schema;
const mongooseObjectId = require("mongoose").Types.ObjectId;

const StoreMerchantModel = db.model(
    "Store-Merchant",
    new mongooseSchema({
        userId: { type: mongooseObjectId, required: true },
        name: { type: String, unique: true, required: true },
        token: { type: String, required: false, default: null },
        products: [],
        transactions: [],
        balance: { type: Number, min: 0, default: 0 },
        reviews: [
            {
                fromUser: {
                    type: mongooseObjectId,
                    required: true,
                    unique: true,
                },
                stars: { type: Number, max: 5, min: 0, required: true },
                comment: { type: String, required: false },
            },
        ],
        address: {
            al1: { type: String, required: true },
            al2: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            pincode: { type: String, required: true },
        },
        contact: {
            mobile: { type: String, required: true },
            email: { type: String, required: true },
        },
    }),
    "Store-Merchant"
);
const StoreProductModel = db.model(
    "Store-Product",
    new mongooseSchema({
        name: { type: String, required: true },
        options: [
            {
                data: { type: Object, required: true },
                price: { type: Number, required: true, min: 0 },
                availableStock: { type: Number, required: true, min: 0 },
            },
        ],
        category: { type: String, required: true, default: "General" },
        description: { type: Array, required: true },
        images: { type: Array, required: false },
        specs: { type: Object, required: true },
        soldBy: { type: mongooseObjectId, required: true },
        offers: [
            {
                discount: { type: Number, required: true, min: 0, max: 100 },
                fromDate: { type: Date, required: true },
                uptoDate: { type: Date, required: true },
                maxQty: { type: Number, required: true },
            },
        ],
    }),
    "Store-Product"
);
const StoreCartModel = db.model(
    "Store-Cart",
    new mongooseSchema({
        userId: { type: mongooseObjectId, required: true },
        cart: { type: Array },
    }),
    "Store-Cart"
);
const StoreOrderModel = db.model(
    "Store-Order",
    new mongooseSchema({
        userId: { type: mongooseObjectId, required: true },
        status: { type: String, required: true },
        deliveryDate: { type: Number, required: false, default: null },
        cancelDate: { type: Number, required: false, default: null },
        orderDate: {
            type: Number,
            required: false,
            default: Date.now(),
        },
        order: { type: Array },
        payment: {
            txnId: { type: String, required: true },
            type: { type: String, required: true },
            amount: { type: Number, required: true, min: 0 },
        },
    }),
    "Store-Order"
);

module.exports = {
    StoreProductModel,
    StoreCartModel,
    StoreOrderModel,
    StoreMerchantModel,
};
