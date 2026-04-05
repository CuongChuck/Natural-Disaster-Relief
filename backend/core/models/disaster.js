'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Disaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Disaster.belongsTo(models['User'], { as: 'user', foreignKey: 'userId' });
    }
  }
  Disaster.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    area: {
      type: DataTypes.GEOMETRY('POLYGON', 4326),
      allowNull: false
    },
    severity: {
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
  }, {
    sequelize,
    modelName: 'Disaster',
    indexes: [
      { fields: ['userId'] },
    ],
  });
  return Disaster;
};