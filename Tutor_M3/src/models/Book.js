const { getDB } = require("../config/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Book extends Model {
  static associate(models){
    // Relationship dengan shop
    this.belongsToMany(models.Shop, {through: models.ShopBook, foreignKey: 'id_book'})
  }
}
Book.init(
  {
    id_book: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Book",
    tableName: "books",
  }
);

module.exports = Book;
