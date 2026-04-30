'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class SupplyEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SupplyEvent.belongsTo(models['Event'], { as: 'event', foreignKey: 'eventId' });
    }
  }
  SupplyEvent.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    supplyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'SupplyEvent',
    tableName: 'SupplyEvent',
    freezeTableName: true,
    indexes: [
      { fields: ['supplyId'] },
      { fields: ['eventId'] },
    ],
  });
  return SupplyEvent;
};