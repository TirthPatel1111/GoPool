const db = require("../db");
const mongooseSchema = require("mongoose").Schema;
const mongooseObjectId = require("mongoose").Types.ObjectId;

const NoteModel = db.model(
    "Note",
    new mongooseSchema({
        userId: { type: mongooseObjectId, required: true, unique: true },
        notes: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
                priority: {
                    type: String,
                    required: true,
                    enum: ["Critical", "High", "Normal", "Low"],
                },
                deadline: { type: Number, required: false, default: null },
                createDate: {
                    type: Number,
                    required: false,
                    default: Date.now(),
                },
                updateDate: { type: Number, required: false, default: null },
            },
        ],
    }),
    "Note"
);

module.exports = NoteModel;
