'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Delivery.belongsTo(models['Supply'], { as: 'supply', foreignKey: 'supplyId' });
      Delivery.belongsTo(models['User'], { as: 'recipient', foreignKey: 'recipientId' });
      Delivery.belongsTo(models['User'], { as: 'operator', foreignKey: 'operatorId' });
    }
  }
  Delivery.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    supplyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipientId: {
      type: DataTypes.INTEGER,
    },
    operatorId: {
      type: DataTypes.INTEGER
    },
    receipt_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    receipt_public_id: {
      type: DataTypes.STRING
    },
    proof_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    proof_public_id: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Delivery',
    indexes: [
      { fields: ['supplyId'] },
      { fields: ['recipientId'] },
      { fields: ['operatorId'] }
    ]
  });
  return Delivery;
};