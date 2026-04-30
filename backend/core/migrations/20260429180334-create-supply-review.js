'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('SupplyReviews', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    supplyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Supplies',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    reviewerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    category: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    unit: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    address_line: {
      type: Sequelize.STRING
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

  await queryInterface.addIndex('SupplyReviews', ['supplyId']);
  await queryInterface.addIndex('SupplyReviews', ['reviewerId']);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('SupplyReviews');
}