const db = require("../db");
const mongooseSchema = require("mongoose").Schema;
const mongooseObjectId = require("mongoose").Types.ObjectId;

const FoodieProductModel = db.model(
    "Foodie-Product",
    new mongooseSchema({
        organizationId: { type: mongooseObjectId, required: true },
        image: { type: Array, required: false },
        name: { type: String, required: true },
        buyQtyLimit: { type: Number, required: true, min: 1 },
        ingredients: { type: Array, required: true },
        category: { type: String, required: true },
        veg: { type: Boolean, required: true },
        rating: { type: Number, required: false, min: 0, max: 5 },
        spiceLevel: {
            type: String,
            required: true,
        },
        availableSizes: [
            {
                name: { type: String, required: true },
                data: { type: Object, required: true },
                price: { type: Number, required: true, min: 0 },
            },
        ],
    }),
    "Foodie-Product"
);
const FoodieCartModel = db.model(
    "Foodie-Cart",
    new mongooseSchema({
        userId: { type: mongooseObjectId, required: true },
        cart: { type: Array },
    }),
    "Foodie-Cart"
);
const FoodieOrderModel = db.model(
    "Foodie-Order",
    new mongooseSchema({
        userId: { type: mongooseObjectId, required: true },
        status: { type: String, required: true },
        order: { type: Array },
        deliveryDate: { type: Number, required: false, default: null },
        cancelDate: { type: Number, required: false, default: null },
        orderDate: {
            type: Number,
            required: false,
            default: Date.now(),
        },
        type: { type: String, required: true, enum: ["TakeOut", "Delivery"] },
        payment: {
            txnId: { type: String, required: true },
            type: { type: String, required: true },
            amount: { type: Number, required: true, min: 0 },
        },
        address: { type: Object, required: false },
    }),
    "Foodie-Order"
);
const FoodieOrganizationModel = db.model(
    "Foodie-Organization",
    new mongooseSchema({
        name: { type: String, required: true, unique: true },
        image: { type: String, required: false },
        email: { type: String, required: true },
        admin: { type: mongooseObjectId, required: true },
        franchise: [
            {
                address: { type: String, required: true },
                city: { type: String, required: true },
                state: { type: String, required: true },
                country: { type: String, required: true },
                openTime: { type: String, required: true },
                closeTime: { type: String, required: true },
                location: {
                    type: {
                        type: String,
                        required: false,
                        default: "Point",
                    },
                    coordinates: {
                        type: [Number],
                        required: true,
                    },
                },
                people: { type: Array, required: false, default: [] },
            },
        ],
    }),
    "Foodie-Organization"
);

module.exports = {
    FoodieProductModel,
    FoodieCartModel,
    FoodieOrderModel,
    FoodieOrganizationModel,
};
