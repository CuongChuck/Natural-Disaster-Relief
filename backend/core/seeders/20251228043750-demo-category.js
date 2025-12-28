'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Categories', [
    {
      name: 'thuốc',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'thức ăn',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'nước',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'dụng cụ',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'trú ẩn',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'tiền',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Categories', null, {});
}
