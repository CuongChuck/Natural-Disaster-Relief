'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isPositive(value) {
          if (value <= 0) {
            throw new Error('Count must be a positive integer');
          }
        }
      }
    },
    expected_ward: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expected_district: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expected_city_province: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ward: {
      type: DataTypes.STRING,
      allowNull: false
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city_province: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Supply',
  });
  return Supply;
};