const { getDB } = require("../config/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

// Untuk membuat model sequelize, ada 2 cara :
//  1. Pakai sequelize.define()
//  2. Extend class dengan Model dari sequelize

// Cara 1
// const User = sequelize.define('User',{
//   // Atribut dari model
//   // Isi persis dengan apa yang ada di database
//   // Atribut model = kolom dari tabel di database
//   id_user: {
//     type: DataTypes.BIGINT,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   }
// },{
//   sequelize, // connection instance
//   modelName: "User", // nama model
//   tableName: "users", // tabel dari model
// });

// Cara 2
class User extends Model {
  static associate(models){
    // Relationship dengan shop
    this.hasMany(models.Shop, {foreignKey: 'id_user'});
  }
}

User.init(
  {
    id_user: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "User",
    tableName: "users",
  }
);

module.exports = User;
