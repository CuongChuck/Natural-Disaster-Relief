'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Units', [
    {
      name: 'kg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'l',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'phần',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'nghìn đồng',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Units', null, {});
}
