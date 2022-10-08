const EventModel = require("../models/Events");
const AuthModel = require("../models/Auth");
const { response } = require("../utils/response");
const mongooseObjectId = require("mongoose").Types.ObjectId;

const Event = (req, res) => {
    /**
     * Body: userId, registered
     */
    var query = {};
    if (req.query.userId) query["userId"] = mongooseObjectId(req.query.userId);
    else if (req.query.registered && req.query.registered === "1")
        query["registration.attendee"] = req.tokenData._id;

    EventModel.find(query, (err, data) => {
        if (err) throw err;
        return response(res, true, "Event Fetched", data);
    });
};
const AddEvent = (req, res) => {
    /**
     * Body: category, title, description, image, tags, venue, date, paid, price, deadline, rules, numAttendee
     */
    const query = new EventModel({
        userId: req.tokenData._id,
        category: req.body.category,
        event: {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            tags: req.body.tags,
            venue: req.body.venue,
            date: req.body.date,
        },
        fee: { paid: req.body.paid, price: req.body.price || 0 },
        registration: {
            numAttendee: req.body.numAttendee,
            deadline: req.body.deadline || null,
            rules: req.body.rules || [],
        },
    });
    query.save((err, data) => {
        if (err) throw err;
        response(res, true, "Event Created");
    });
};
const UpdateEvent = (req, res) => {
    /**
     * Body: eventId, ...updates
     */
    EventModel.updateOne(
        {
            _id: mongooseObjectId(req.body.eventId),
            userId: mongooseObjectId(req.tokenData._id),
        },
        {
            $set: {
                "event.title": req.body.title,
                "event.description": req.body.description,
                "event.image": req.body.image,
                "event.tags": req.body.tags,
                "event.venue": req.body.venue,
                "event.date": req.body.date,
                "fee.paid": req.body.paid,
                "fee.price": req.body.price,
                "registration.numAttendee": req.body.numAttendee,
                "registration.deadline": req.body.deadline,
                "registration.rules": req.body.rules,
            },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Event Updated");
            else response(res, false, "Unable to update your event");
        }
    );
};
const RemoveEvent = (req, res) => {
    /**
     * Body: eventId
     */
    EventModel.deleteOne(
        {
            _id: mongooseObjectId(req.body.eventId),
            userId: req.tokenData._id,
        },
        (err, result) => {
            if (err) throw err;
            if (result.deletedCount === 1) response(res, true, "Event Removed");
            else response(res, false, "Unable to remove your event");
        }
    );
};
const RegisterEvent = (req, res) => {
    /**
     * Body: eventId
     */
    EventModel.updateOne(
        {
            _id: mongooseObjectId(req.body.eventId),
            "registration.numAttendee": { $gt: 0 },
            "registration.deadline": { $gt: Date.now() },
        },
        {
            $addToSet: { "registration.attendee": req.tokenData._id },
            $inc: { "registration.numAttendee": -1 },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Registered to Event");
            else response(res, false, "Unable to register to event");
        }
    );
};
const UnregisterEvent = (req, res) => {
    /**
     * Body: eventId
     */
    EventModel.updateOne(
        {
            _id: mongooseObjectId(req.body.eventId),
        },
        {
            $pull: { "registration.attendee": req.tokenData._id },
            $inc: { "registration.numAttendee": 1 },
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "Unregistered from Event");
            else response(res, false, "Unable to unregister");
        }
    );
};
const LikeEvent = async (req, res) => {
    /**
     * BODY: eventId
     */
    var query = {};
    if (
        await EventModel.exists({
            _id: mongooseObjectId(req.body.eventId),
            likes: { $in: req.tokenData._id },
        })
    )
        query = { $pull: { likes: req.tokenData._id } };
    else query = { $addToSet: { likes: req.tokenData._id } };
    EventModel.updateOne(
        {
            _id: mongooseObjectId(req.body.eventId),
        },
        query,
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                response(res, true, "toggled like for event");
            else response(res, false, "Unable to toggle like for event");
        }
    );
};
const GetLikedEvent = (req, res) => {
    EventModel.find(
        {
            likes: { $in: req.tokenData._id },
        },
        (err, data) => {
            if (err) throw err;
            return response(res, true, "Liked Event Fetched", data);
        }
    );
};
const GetAttendeeList = (req, res) => {
    /**
     * Body: eventId
     */
    EventModel.findOne(
        { _id: mongooseObjectId(req.query.eventId) },
        { "registration.attendee": 1 },
        (err, data) => {
            if (err) throw err;
            AuthModel.find(
                { _id: { $in: data.registration.attendee } },
                { name: 1, email: 1, _id: 0 },
                (err, data1) => {
                    if (err) throw err;
                    response(res, true, "Fetched Attendee List", data1);
                }
            );
        }
    );
};

module.exports = {
    Event,
    AddEvent,
    UpdateEvent,
    RemoveEvent,
    RegisterEvent,
    UnregisterEvent,
    LikeEvent,
    GetLikedEvent,
    GetAttendeeList,
};
