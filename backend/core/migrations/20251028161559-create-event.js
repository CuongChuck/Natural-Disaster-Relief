'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Events', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    description: {
      type: Sequelize.TEXT
    },
    startTime: {
      type: Sequelize.DATE,
      allowNull: false
    },
    name: {
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

  await queryInterface.addIndex('Events', ['userId']);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Events');
}