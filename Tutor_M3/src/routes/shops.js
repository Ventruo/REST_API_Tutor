const { response } = require("express");
const express = require("express");
const { Op } = require("sequelize");
const Book = require("../models/Book");

const Shop = require("../models/Shop");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  let {name} = req.query

  let shops = await Shop.findAll({
    where: {
      name: {
        [Op.like] : name ? '%'+name+'%' : '%%'
      }
    },
    attributes: ['name', 'location'],
    include: [
      {as: 'Owner', model: User, attributes: ['name']},
      {
        model: Book,
        attributes: ['title'],
        through: {
          attributes: ['quantity']
        }
      }
    ],
  });

  if (shops.length === 0) {
      return res.status(404).json({
          message: "No shops found",
          shops,
      });
  }
  return res.status(200).send({
      message: "Shops found",
      shops,
  });
});

router.post("/:id_shop/stock", async (req, res) => {
  let {id_shop} = req.params;
  let {id_book, quantity} = req.body;

  try {
    const shop = await Shop.findByPk(id_shop);
    const book = await Book.findByPk(id_book);

    if(!shop){
      throw "Toko tidak ditemukan"
    }

    const checkAvailable = await shop.hasBook(book);
    if (checkAvailable){
      throw "Buku sudah ada di dalam toko"
    }

    await shop.addBook(book,{
      through: {
        quantity: quantity
      }
    })

  } catch (error) {
    return res.status(400).send({
      message: "Insert Failed",
      error,
    });
  }

  return res.status(201).send({
      message: "Insert Success",
  });
});

module.exports = router;
