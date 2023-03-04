const { response } = require("express");
const express = require("express");
const { Op } = require("sequelize");
const Shop = require("../models/Shop");
const User = require("../models/User");

const router = express.Router();

// Jangan lupa tambahkan async dan juga await pada syntax query model
// Jika tidak ada async dan await, maka data tidak akan muncul ketika di return
// CONTOH SELECT
// Untuk select ada beberapa syntax, yaitu findAll, findByPk, findOne
router.get("/", async (req, res) => {
  let {name} = req.query

  let users = await User.findAll({
    where: {
      // Untuk where clause, bisa menggunakan operator
      // Jika tidak mencantumkan operator, maka default yang dipakai adalah equal
      // Berikut adalah contoh penggunaan operator like
      name: {
        [Op.like] : name ? '%'+name+'%' : '%%'
      }
    },
    // Attributes digunakan untuk menentukan kolom apa saja yang ingin ditampilkan
    attributes: ['name'],
    // Include dibuat untuk menyertakan data lain dari hasil relationship (ada di file associations.js)
    // Contohnya disini, data semua toko milik user jika akan ditampilkan
    include: [
      {
        model: Shop,
        attributes: ['name', 'location']
      }
    ]
  });

  if (users.length === 0) {
      return res.status(404).json({
          message: "No users found",
          users,
      });
  }
  return res.status(200).send({
      message: "Users found",
      users,
  });
});

// CONTOH INSERT
router.post("/", async (req, res) => {
  let {name} = req.body;
  let user = null

  // Pemakaian try catch itu optional
  // Try catch disini digunakan agar bisa menampilkan error apa yang didapat dan program tidak crash
  try {
    user = await User.create({
      name: name
    });
  } catch (error) {
    return res.status(400).send({
      message: "Insert Failed",
      error,
    });
  }

  return res.status(201).send({
      message: "Insert Success",
      user,
  });
});

// CONTOH UPDATE
router.put("/:id_user", async (req, res) => {
  let {name} = req.body;
  let {id_user} = req.params;

  try {
    // Pengecekkan apakah user yang akan diupdate ada di db atau tidak
    const checkUser = await User.findOne({
      where:{
        id_user: id_user
      }
    })

    if(!checkUser){
      throw "User tidak ditemukan";
    }

    users = await User.update(
      {
        name: name
      },
      {
        where: {
          id_user: id_user
        }
      }
    );
  } catch (error) {
    return res.status(400).send({
      message: "Insert Failed",
      error,
    });
  }

  return res.status(200).send({
      message: "Update Success"
  });
});

// CONTOH DELETE
router.delete("/:id_user", async (req, res) => {
  let {id_user} = req.params;

  try {
    // Pengecekkan apakah user yang akan diupdate ada di db atau tidak
    const checkUser = await User.findOne({
      where:{
        id_user: id_user
      }
    })

    if(!checkUser){
      throw "User tidak ditemukan";
    }

    users = await User.destroy(
      {
        where: {
          id_user: id_user
        }
      }
    );
  } catch (error) {
    return res.status(400).send({
      message: "Delete Failed",
      error,
    });
  }

  return res.status(200).send({
      message: "Delete Success"
  });
});

module.exports = router;
