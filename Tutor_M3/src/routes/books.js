const { response } = require("express");
const express = require("express");
const { Op } = require("sequelize");

// model
const Book = require("../models/Book");
const Shop = require("../models/Shop");

const router = express.Router();

router.get("/", async (req, res) => {
    let {title} = req.query

    let books = await Book.findAll({
        where: {
            title: {
                [Op.like] : title ? '%'+title+'%' : '%%'
            }
        },
        attributes: ['title'],
        include: [
            {
                model: Shop, 
                attributes: ['name', 'location'],
                // Untuk data dari junction tablenya
                through: {
                    attributes: []
                }
            }
        ],
    });

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

module.exports = router;
