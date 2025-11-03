'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER.UNSIGNED.ZEROFILL
      },
      recipientId: {
        type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      categoryId: {
        type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
        allowNull: false,
        references: {
          model: 'Category',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      unitId: {
        type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
        allowNull: false,
        references: {
          model: 'Unit',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      location: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Requests');
  }
};
