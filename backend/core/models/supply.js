'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Supply.belongsTo(models['User'], { as: 'donor' });
      Supply.belongsTo(models['Category']);
      Supply.belongsTo(models['Unit']);
      Supply.belongsToMany(models['Event'], { through: 'SupplyEvent' });
    }
  }
  Supply.init({
    name: DataTypes.STRING,
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isPositive(value) {
          if (value <= 0) {
            throw new Error('Quantity must be a positive number');
          }
        }
      }
    },
    expectedDestination: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    actualDestination: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Supply',
  });
  return Supply;
};