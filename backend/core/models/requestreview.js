'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class RequestReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RequestReview.belongsTo(models['Request'], { as: 'review', foreignKey: 'requestId' });
      RequestReview.belongsTo(models['User'], { as: 'reviewer', foreignKey: 'reviewerId' });
    }
  }
  RequestReview.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    requestId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reviewerId: {
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
    priority: {
      type: DataTypes.ENUM('Thấp', 'Trung bình', 'Cao'),
      allowNull: false
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'RequestReview',
    tableName: 'RequestReview',
    freezeTableName: true,
    indexes: [
      { fields: ['requestId'] }
    ]
  });
  return RequestReview;
};