'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Deliveries', [
    {
      supplyId: 2,
      operatorId: 1,
      recipientId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Deliveries', null, {});
}
