/*
    File ini merupakan file di mana inisialisasi objek Sequelize dilakukan.
    Inisialisasi ini dilakukan agar dapat menggunakan Sequelize.
    Properti2 seperti host, port, username, dll. didapatkan dari konfigurasi DB di config.json.
    Jangan lupa module.exports karena jika tidak diexport, Sequelize tidak dapat digunakan.
*/

const Sequelize = require('sequelize');
const config = require('../config/config.json')

const {
    host,
    port,
    username,
    password,
    database,
    dialect,
} = config.w2_tutor_connection

const w2Connection = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: dialect
})

module.exports = w2Connection