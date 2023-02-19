const express = require("express");

const shops = require("./routes/shops");
const users = require("./routes/users");
const books = require("./routes/books");
const Associations = require("./models/associations")();

const app = express();
app.set("port", 3000);
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/shops", shops);
app.use("/users", users);
app.use("/books", books);

app.listen(app.get("port"), () => {
    console.log(`Server started at http://localhost:${app.get("port")}`);
});

module.exports = app;