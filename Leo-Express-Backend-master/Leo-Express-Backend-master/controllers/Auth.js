const bcrypt = require("bcrypt");
const AuthModel = require("../models/Auth");
const { response } = require("../utils/response");
const { encodeToken } = require("../utils/token");

const NewAccount = async (req, res) => {
    /**
     * Body: name, email, password
     */
    const account = await AuthModel.exists({ email: req.body.email });
    if (account !== null) return response(res, false, "Already Exists");
    else {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) throw err;
            const query = new AuthModel({
                name: req.body.name,
                email: req.body.email,
                "local.password": hash,
            });
            query.save((err, data) => {
                if (err) throw err;
                return response(
                    res,
                    true,
                    "New Account Successful",
                    encodeToken({
                        name: req.body.name,
                        email: req.body.email,
                        _id: data._id,
                    })
                );
            });
        });
    }
};
const Account = (req, res) => {
    AuthModel.findOne(
        { name: req.tokenData.name, email: req.tokenData.email },
        { local: 0, "google.token": 0, "facebook.token": 0 },
        (err, data) => {
            if (err) throw err;
            return response(res, true, "Account fetched", data);
        }
    );
};
const Login = async (req, res) => {
    /**
     * Body: email, password
     */
    AuthModel.findOne(
        { email: req.body.email },
        { "local.password": 1, name: 1 },
        (err, data) => {
            if (err) throw err;
            if (data === null)
                return response(res, false, "No Such Account Found");
            else {
                bcrypt.compare(
                    req.body.password,
                    data.local.password,
                    (err, result) => {
                        if (err) throw err;
                        if (result === false)
                            return response(res, false, "Incorrect Password");
                        else {
                            const token = encodeToken({
                                name: data.name,
                                email: req.body.email,
                                _id: data._id,
                            });
                            AuthModel.updateOne(
                                { email: req.body.email },
                                { "local.token": token },
                                (err, data) => {
                                    if (err) throw err;
                                    if (data.modifiedCount === 1)
                                        return response(
                                            res,
                                            true,
                                            "Login Successful",
                                            token
                                        );
                                    else
                                        return response(
                                            res,
                                            false,
                                            "Unable to generate Token"
                                        );
                                }
                            );
                        }
                    }
                );
            }
        }
    );
};
const Logout = (req, res) => {
    AuthModel.updateOne(
        { name: req.tokenData.name, email: req.tokenData.email },
        { "local.token": null },
        (err, data) => {
            if (err) throw err;
            if (data.modifiedCount === 1)
                response(res, true, "Logout Successful");
            else response(res, false, "Unable to logout");
        }
    );
};

module.exports = { NewAccount, Account, Login, Logout };
