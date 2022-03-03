'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cryptocurrency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.cryptocurrency.belongsTo(models.user)
      models.cryptocurrency.belongsTo(models.position)
    }
  }
  cryptocurrency.init({
    name: DataTypes.STRING,
    assetId: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cryptocurrency',
  });
  return cryptocurrency;
};