'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Journeys', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    eventId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    plate: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isCompleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    endTime: {
      type: Sequelize.DATE
    },
    dest_address_line: {
      type: Sequelize.STRING
    },
    dest_ward: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dest_district: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dest_city_province: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  await queryInterface.addIndex('Journeys', ['eventId']);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Journeys');
}