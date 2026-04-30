'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('SupplyEvent', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    supplyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Supplies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    eventId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
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

  await queryInterface.addIndex('SupplyEvent', ['supplyId']);
  await queryInterface.addIndex('SupplyEvent', ['eventId']);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('SupplyEvent');
}
