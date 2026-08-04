'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Supplies', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    donorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity: {
      type: Sequelize.FLOAT,
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
    count: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    proof_url: {
      type: Sequelize.STRING
    },
    proof_public_id: {
      type: Sequelize.STRING,
    },
    status: {
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

  await queryInterface.addIndex('Supplies', ['donorId']);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Supplies');
}
