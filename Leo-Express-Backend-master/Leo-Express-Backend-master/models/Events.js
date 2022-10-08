const db = require("../db");
const mongooseSchema = require("mongoose").Schema;
const mongooseObjectId = require("mongoose").Types.ObjectId;

const EventModel = db.model(
    "Event",
    new mongooseSchema({
        userId: { type: mongooseObjectId, required: true, unique: true },
        category: { type: String, required: true },
        event: {
            title: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: Array },
            tags: { type: Array },
            venue: { type: String, required: true },
            date: { type: Number, required: true },
        },
        fee: {
            paid: { type: Boolean, required: true },
            price: { type: Number, required: false },
        },
        registration: {
            numAttendee: { type: Number, required: false, default: null },
            attendee: { type: Array },
            deadline: { type: Number, required: false, default: null },
            rules: { type: Array },
        },
        likes: { type: Array, required: false, default: [] },
        createDate: {
            type: Number,
            required: false,
            default: Date.now(),
        },
        updateDate: { type: Number, required: false, default: null },
    }),
    "Event"
);

module.exports = EventModel;
