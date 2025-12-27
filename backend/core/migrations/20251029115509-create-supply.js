'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Supplies', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER.UNSIGNED.ZEROFILL
    },
    categoryId: {
      type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    unitId: {
      type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      references: {
        model: 'Units',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    donorId: {
      type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    expected_ward: {
      type: Sequelize.STRING,
      allowNull: false
    },
    expected_district: {
      type: Sequelize.STRING,
      allowNull: false
    },
    expected_city_province: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ward: {
      type: Sequelize.STRING,
      allowNull: false
    },
    district: {
      type: Sequelize.STRING,
      allowNull: false
    },
    city_province: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Supplies');
}
