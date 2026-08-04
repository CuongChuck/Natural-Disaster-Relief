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
      Request.belongsTo(models['User'], { as: 'recipient', foreignKey: 'recipientId' });
      Request.hasOne(models['RequestReview'], { foreignKey: 'requestId' });
    }
  }
  Request.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    recipientId: {
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
    category: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('Thấp', 'Trung bình', 'Cao'),
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
    }
  },  {
    sequelize,
    modelName: 'Request',
    indexes: [
      { fields: ['recipientId'] },
    ],
  });
  return Request;
};