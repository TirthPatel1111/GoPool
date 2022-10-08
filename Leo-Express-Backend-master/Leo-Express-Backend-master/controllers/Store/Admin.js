const bcrypt = require("bcrypt");
const { response } = require("../../utils/response");
const AuthModel = require("../../models/Auth");
const { StoreMerchantModel } = require("../../models/Store");
const mongooseObjectId = require("mongoose").Types.ObjectId;
const { encodeStoreMerchantToken } = require("../../utils/token");

const Register = (req, res) => {
    /**
     * Body: name, address:{al1, al2, city, state, country, pincode}, mobile, email
     */
    const query = new StoreMerchantModel({
        name: req.body.name,
        userId: req.tokenData._id,
        "address.al1": req.body.address.al1,
        "address.al2": req.body.address.al2,
        "address.city": req.body.address.city,
        "address.state": req.body.address.state,
        "address.country": req.body.address.country,
        "address.pincode": req.body.address.pincode,
        "contact.mobile": req.body.mobile,
        "contact.email": req.body.email,
    });
    query.save((err, result) => {
        if (err) throw err;
        if (result) return response(res, true, "Registration Successful");
        else return response(res, false, "Unable to Register");
    });
};
const GenerateMerchantToken = (req, res) => {
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
            bcrypt.compare(
                req.body.password,
                data.local.password,
                (err, result) => {
                    if (err) throw err;
                    if (result === false)
                        return response(res, false, "Incorrect Password");
                    StoreMerchantModel.findOne(
                        { userId: data._id },
                        (err, data1) => {
                            if (err) throw err;
                            if (data1 === null)
                                return response(
                                    res,
                                    false,
                                    "You are not registered as Store Merchant"
                                );
                            const token = encodeStoreMerchantToken({
                                name: data.name,
                                email: req.body.email,
                                userid: data._id,
                                merchantId: data1._id,
                            });
                            StoreMerchantModel.updateOne(
                                { userId: data._id },
                                { token: token },
                                (err, data2) => {
                                    if (err) throw err;
                                    if (data2.modifiedCount === 1)
                                        return response(
                                            res,
                                            true,
                                            "Merchant Token Obtained (Valid for 15 mins)",
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
                    );
                }
            );
        }
    );
};
const UpdateContact = (req, res) => {
    /**
     * Body: email, mobile
     */
    StoreMerchantModel.updateOne(
        { _id: mongooseObjectId(req.tokenData.merchantId) },
        { "contact.email": req.body.email, "contact.mobile": req.body.mobile },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                return response(res, true, "Contact Updated Successfully");
            else return response(res, false, "Unable to update Contact");
        }
    );
};
const UpdateAddress = (req, res) => {
    /**
     * Body: al1, al2, city, state, country, pincode
     */
    StoreMerchantModel.updateOne(
        { _id: mongooseObjectId(req.tokenData.merchantId) },
        {
            "address.al1": req.body.al1,
            "address.al2": req.body.al2,
            "address.city": req.body.city,
            "address.state": req.body.state,
            "address.country": req.body.country,
            "address.pincode": req.body.pincode,
        },
        (err, result) => {
            if (err) throw err;
            if (result.modifiedCount === 1)
                return response(res, true, "Address Updated Successfully");
            else return response(res, false, "Unable to update Address");
        }
    );
};

module.exports = {
    Register,
    GenerateMerchantToken,
    UpdateContact,
    UpdateAddress,
};
