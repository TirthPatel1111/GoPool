const db = require("../db");
const mongooseSchema = require("mongoose").Schema;

const AuthModel = db.model(
    "Auth",
    new mongooseSchema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        local: {
            password: { type: String, required: false },
            token: { type: String, required: false },
        },
        facebook: {
            id: { type: String, required: false },
            token: { type: String, required: false },
        },
        google: {
            id: { type: String, required: false },
            token: { type: String, required: false },
        },
    }),
    "Auth"
);

module.exports = AuthModel;
