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
      Supply.belongsTo(models['User'], { as: 'donor', foreignKey: 'donorId' });
      Supply.belongsToMany(models['Event'], { through: 'SupplyEvent' });
    }
  }
  Supply.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    donorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
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
    category: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    proof: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    address_line: {
      type: DataTypes.STRING
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
    },
    expected_address_line: {
      type: DataTypes.STRING
    },
    expected_ward: {
      type: DataTypes.STRING
    },
    expected_district: {
      type: DataTypes.STRING
    },
    expected_city_province: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Supply',
    indexes: [
      { fields: ['donorId'] },
    ],
  });
  return Supply;
};