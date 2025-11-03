'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      expectedDestination: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      actualDestination: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Supplies');
  }
};
