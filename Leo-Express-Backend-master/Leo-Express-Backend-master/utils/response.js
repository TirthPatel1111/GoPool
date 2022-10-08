const response = (res, success, msg = "Default MSG", data = {}) =>
    res.json({ success, msg, data });

module.exports = { response };
