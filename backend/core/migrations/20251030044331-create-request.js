'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Requests', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    UserId: {
      type: Sequelize.INTEGER,
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
    quantity: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false
    },
    unit: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM("PENDING, ACTIVE, REJECTED"),
      allowNull: false
    },
    priority: {
      type: Sequelize.ENUM("LOW, MEDIUM, HIGH, URGENT"),
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

  await queryInterface.addIndex('Requests', ['UserId']);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Requests');
}
