const Shop = require("./Shop");
const User = require("./User");
const Book = require("./Book");
const ShopBook = require("./ShopBook");

// RELATIONSHIP
// 1. Untuk one-to-one, syntax yang akan dipakai adalah hasOne dan belongsTo
// 2. Untuk one-to-many, syntax yang akan dipakai adalah hasMany dan belongsTo
// 3. Untuk many-to-many, syntax yang akan dipakai semuanya adalah belongsToMany

// Contoh one-to-one
// A = source model, B = target model
// A.hasOne(B), B.belongsTo(A)

// Contoh one-to-many
// A = source model, B = target model
// A.hasMany(B), B.belongsTo(A)

// Contoh many-to-many
// A = source model, B = target model, 'C' = junction table
// A.belongsToMany(B, {through: 'C'}), B.belongsToMany(A, {through: 'C'})

// Pada tutor kali ini, relationshipnya adalah :
// 1. 1 user bisa punya banyak toko, 1 toko cuman bisa dimiliki 1 user
// 2. 1 toko bisa menyediakan banyak buku, 1 buku bisa tersedia di banyak toko

module.exports = function() {
  // 1
  User.hasMany(Shop, {foreignKey: 'id_user'});
  // as digunakan untuk memberikan alias pada relationship
  // Alias ini biasanya digunakan pada saat 2 model yang sama mempunyai lebih dari 1 relationship
  Shop.belongsTo(User, {as: 'Owner', foreignKey: 'id_user'});

  //2
  Book.belongsToMany(Shop, {through: ShopBook, foreignKey: 'id_book'})
  Shop.belongsToMany(Book, {through: ShopBook, foreignKey: 'id_shop'})
}