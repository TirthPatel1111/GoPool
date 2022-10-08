const NoteModel = require("../models/Notes");
const { response } = require("../utils/response");
const mongooseObjectId = require("mongoose").Types.ObjectId;

const Note = (req, res) => {
    NoteModel.findOne(
        {
            userId: mongooseObjectId(req.tokenData._id),
        },
        (err, data) => {
            if (err) throw err;
            response(res, true, "Note Found", data.notes);
        }
    );
};
const NewNote = async (req, res) => {
    /**
     * Body: title, description, priority, deadline
     */
    if ((await NoteModel.exists({ userId: req.tokenData._id })) === null)
        await createNote(req.tokenData._id);
    NoteModel.updateOne(
        {
            userId: req.tokenData._id,
        },
        {
            $addToSet: {
                notes: {
                    title: req.body.title,
                    description: req.body.description,
                    priority: req.body.priority || "Normal",
                    deadline: req.body.deadline || null,
                },
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1) response(res, true, "Note Added");
            else response(res, false, "Unable to add note");
        }
    );
};
const UpdateNote = (req, res) => {
    /**
     * Body: noteId, title, description, priority, deadline
     */
    NoteModel.updateOne(
        {
            userId: req.tokenData._id,
            notes: {
                $elemMatch: {
                    _id: mongooseObjectId(req.body.noteId),
                },
            },
        },
        {
            "notes.$.title": req.body.title,
            "notes.$.description": req.body.description,
            "notes.$.priority": req.body.priority || "Normal",
            "notes.$.deadline": req.body.deadline || null,
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1) response(res, true, "Note Added");
            else response(res, false, "Unable to add note");
        }
    );
};
const RemoveNote = async (req, res) => {
    /**
     * Body: noteId
     */
    if ((await NoteModel.exists({ userId: req.tokenData._id })) === null)
        await createNote(req.tokenData._id);
    NoteModel.updateOne(
        {
            userId: req.tokenData._id,
        },
        {
            $pull: {
                notes: {
                    _id: mongooseObjectId(req.body.noteId),
                },
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1) response(res, true, "Note Removed");
            else response(res, false, "Unable to remove note");
        }
    );
};

// Helper Function
const createNote = async (userId) => {
    const query = new NoteModel({ userId });
    await query.save();
};
module.exports = { Note, NewNote, UpdateNote, RemoveNote };
