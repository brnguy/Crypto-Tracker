'use strict';
const {
  Model, FLOAT
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.position.belongsTo(models.user)
    }
  }
  position.init({
    asset: DataTypes.STRING,
    quantity: DataTypes.FLOAT,
    purchasePrice: DataTypes.FLOAT,
    purchaseDate: DataTypes.DATEONLY,
    amount: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'position',
  });
  return position;
};