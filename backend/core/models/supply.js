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
      Supply.hasOne(models['Delivery'], { foreignKey: 'supplyId' });
      Supply.hasOne(models['SupplyReview'], { foreignKey: 'supplyId' });
    }
  }
  Supply.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
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
    proof_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    proof_public_id: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  }, {
    sequelize,
    modelName: 'Supply',
    indexes: [
      { fields: ['donorId'] },
    ],
  });
  return Supply;
};