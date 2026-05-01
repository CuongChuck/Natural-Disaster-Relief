'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Journey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Journey.belongsTo(models['Event'], { as: 'journey', foreignKey: 'eventId' });
    }
  }
  Journey.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    plate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    endTime: {
      type: DataTypes.DATE
    },
    dest_address_line: {
      type: DataTypes.STRING
    },
    dest_ward: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dest_district: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dest_city_province: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Journey',
    timestamps: false,
    indexes: [
      { fields: ['eventId'] }
    ]
  });
  return Journey;
};