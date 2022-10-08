const { NewAccount, Account, Login, Logout } = require("../controllers/Auth");
const { decodeToken } = require("../utils/token");
const AuthRoute = require("express").Router();

AuthRoute.get("/account", decodeToken, Account);
AuthRoute.post("/account", NewAccount);
AuthRoute.post("/login", Login);
AuthRoute.get("/logout", decodeToken, Logout);

module.exports = AuthRoute;
