'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasMany(models['SupplyEvent'], { foreignKey: 'eventId' });
      Event.belongsTo(models['User'], { as: 'user', foreignKey: 'userId' });
    }
  }
  Event.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    name: {
      type: DataTypes.INTEGER,
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
    }
  }, {
    sequelize,
    modelName: 'Event',
    indexes: [
      { fields: ['userId'] },
    ],
  });
  return Event;
};