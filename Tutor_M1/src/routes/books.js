const { response } = require("express");
const express = require("express");

// model
const Book = require("../models/books");

const router = express.Router();

router.get("/", (req, res) => {
    // return all books

    // check if there is a query title
    let books = [];
    if (req.query.title) books = Book.getAllBooks(req.query.title);
    else books = Book.getAllBooks();

    if (books.length === 0) {
        return res.status(404).json({
            message: "No books found",
            books,
        });
    }
    return res.status(200).send({
        message: "Books found",
        books,
    });
});

router.get("/:id", (req, res) => {
    // return a book
    let { id } = req.params;
    const book = Book.getBook(id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found",
        });
    }
    return res.status(200).send({
        message: "Book found",
        book,
    });
});

router.post("/", (req, res) => {
    // add a new book
    console.log(req.boy);

    let { title, author, published_date } = req.body;

    if (title == null || author == null || published_date == null)
        return res.status(400).send({
            message: "Field tidak sesuai ketentuan!"
        })

    const result = Book.addBook(title, author, published_date);
    return res.status(201).send({
        message: "Book added successfully",
        result,
    });
});

router.put("/:id", (req, res) => {
    // update a book
    let { id } = req.params;
    let { title, author, published_date } = req.body;
    const result = Book.updateBook(id, title, author, published_date);

    if (!result) {
        return res.status(404).json({
            message: "Book not found",
        });
    }

    return res.status(201).send({
        message: "Book updated successfully",
        result,
    });
});

router.delete("/:id", (req, res) => {
    // delete a book
    let { id } = req.params;
    const result = Book.deleteBook(id);

    if (!result) {
        return res.status(404).json({
            message: "Book not found",
        });
    }

    return res.status(200).send({
        message: "Book deleted successfully",
        result,
    });
});

module.exports = router;
