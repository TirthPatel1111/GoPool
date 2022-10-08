const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes.
app.use("/auth", require("./routes/Auth"));
app.use("/store/user", require("./routes/Store").StoreUserRoute);
app.use("/store/admin", require("./routes/Store").StoreAdminRoute);
app.use("/note", require("./routes/Note"));
app.use("/blog", require("./routes/Blog"));
app.use("/event", require("./routes/Events"));
app.use("/foodie", require("./routes/Foodie"));
app.use("/instagram", require("./routes/Instagram"));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log("Leo-Backend started listening at", PORT);
});
