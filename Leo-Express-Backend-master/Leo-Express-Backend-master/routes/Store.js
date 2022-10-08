const Router = require("express").Router;
const {
    NewProduct,
    UpdateProduct,
    DeleteProduct,
    UpdateAvailableStock,
    AddOption,
    UpdateOption,
    RemoveOption,
} = require("../controllers/Store/Product");
const { AddCart, UpdateQty, RemoveCart } = require("../controllers/Store/Cart");
const { PlaceOrder, CancelOrder } = require("../controllers/Store/Order");
const {
    Register,
    GenerateMerchantToken,
    UpdateContact,
    UpdateAddress,
} = require("../controllers/Store/Admin");
const { decodeToken, decodeStoreMerchantToken } = require("../utils/token");

/** User */
const StoreUserRoute = Router();
StoreUserRoute.post("/cart", decodeToken, AddCart);
StoreUserRoute.put("/cart", decodeToken, UpdateQty);
StoreUserRoute.delete("/cart", decodeToken, RemoveCart);
StoreUserRoute.post("/order", decodeToken, PlaceOrder);
StoreUserRoute.delete("/order", decodeToken, CancelOrder);

/** Admin */
const StoreAdminRoute = Router();
StoreAdminRoute.post("/register", decodeToken, Register);
StoreAdminRoute.post("/merchantToken", GenerateMerchantToken);
StoreAdminRoute.put("/contact", decodeStoreMerchantToken, UpdateContact);
StoreAdminRoute.put("/address", decodeStoreMerchantToken, UpdateAddress);
StoreAdminRoute.post("/product", decodeStoreMerchantToken, NewProduct);
StoreAdminRoute.put("/product", decodeStoreMerchantToken, UpdateProduct);
StoreAdminRoute.delete("/product", decodeStoreMerchantToken, DeleteProduct);
StoreAdminRoute.post("/stock", decodeStoreMerchantToken, UpdateAvailableStock);
StoreAdminRoute.post("/product/option", decodeStoreMerchantToken, AddOption);
StoreAdminRoute.put("/product/option", decodeStoreMerchantToken, UpdateOption);
StoreAdminRoute.delete(
    "/product/option",
    decodeStoreMerchantToken,
    RemoveOption
);

module.exports = { StoreAdminRoute, StoreUserRoute };
