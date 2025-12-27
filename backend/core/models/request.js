'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Request.belongsTo(models['User'], { as: 'recipient' });
      Request.belongsTo(models['Category']);
      Request.belongsTo(models['Unit']);
    }
  }
  Request.init({
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
    status: {
      type: DataTypes.ENUM("PENDING, ACTIVE, REJECTED"),
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM("LOW, MEDIUM, HIGH, URGENT"),
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
    modelName: 'Request',
  });
  return Request;
};