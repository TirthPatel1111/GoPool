const {
    Event,
    AddEvent,
    UpdateEvent,
    RemoveEvent,
    RegisterEvent,
    UnregisterEvent,
    LikeEvent,
    GetLikedEvent,
    GetAttendeeList,
} = require("../controllers/Events");
const { decodeToken } = require("../utils/token");
const EventRoute = require("express").Router();

EventRoute.get("/", decodeToken, Event);
EventRoute.post("/", decodeToken, AddEvent);
EventRoute.put("/", decodeToken, UpdateEvent);
EventRoute.delete("/", decodeToken, RemoveEvent);
EventRoute.post("/register", decodeToken, RegisterEvent);
EventRoute.delete("/register", decodeToken, UnregisterEvent);
EventRoute.post("/like", decodeToken, LikeEvent);
EventRoute.get("/like", decodeToken, GetLikedEvent);
EventRoute.get("/attendee", decodeToken, GetAttendeeList);

module.exports = EventRoute;
