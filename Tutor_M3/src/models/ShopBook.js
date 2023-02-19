const { getDB } = require("../config/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class ShopBook extends Model {}
ShopBook.init(
  {
    id_shop: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_book: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "ShopBook",
    tableName: "shops_books",
  }
);

module.exports = ShopBook;
