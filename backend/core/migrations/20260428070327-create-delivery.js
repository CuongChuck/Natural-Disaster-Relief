'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Deliveries', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    supplyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Supplies',
        key: 'id'
      },
    },
    recipientId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    operatorId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    receipt_url: {
      type: Sequelize.STRING
    },
    receipt_public_id: {
      type: Sequelize.STRING
    },
    proof_url: {
      type: Sequelize.STRING
    },
    proof_public_id: {
      type: Sequelize.STRING
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
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });

  await queryInterface.addIndex('Deliveries', ['supplyId']);
  await queryInterface.addIndex('Deliveries', ['recipientId']);
  await queryInterface.addIndex('Deliveries', ['operatorId']);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Deliveries');
}