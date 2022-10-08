const mongoose = require("mongoose");
const url = require("./config/db.config").url;

mongoose.Promise = global.Promise;
const db = mongoose.createConnection(url);

module.exports = db;
