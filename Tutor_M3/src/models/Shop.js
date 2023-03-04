const { getDB } = require("../config/sequelize");
const sequelize = getDB();
const { Model, DataTypes } = require("sequelize");

class Shop extends Model {
  static associate(models){
    // Relationship dengan User
    this.belongsTo(models.User, {as: 'Owner', foreignKey: 'id_user'});

    // Relationship dengan Book
    this.belongsToMany(models.Book, {through: models.ShopBook, foreignKey: 'id_shop'})
  }
}
Shop.init(
  {
    id_shop: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Shop",
    tableName: "shops",
  }
);

module.exports = Shop;
