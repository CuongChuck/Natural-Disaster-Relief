'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('SupplyEvent', [
    {
      supplyId: 1,
      eventId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('SupplyEvent', null, {});
}
