const express = require("express");

const shops = require("./routes/shops");
const users = require("./routes/users");
const books = require("./routes/books");

// ALTERNATIF 1 BUAT RELATIONSHIP ANTAR MODEL
// RELATION DILETAKKAN PADA MASING-MASING MODEL
// Init Relationship
const User = require("./models/User");
const Shop = require("./models/Shop");
const Book = require("./models/Book");
const ShopBook = require("./models/ShopBook");
User.associate({Shop});
Shop.associate({User, Book, ShopBook});
Book.associate({Shop, ShopBook});

// ALTERNATIF 2 BUAT RELATIONSHIP ANTAR MODEL
// RELATION DILETAKKAN PADA SATU FILE TERPISAH SENDIRI (associations.js)
// const Associations = require("./models/associations")();

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