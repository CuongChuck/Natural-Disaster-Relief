'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Deliveries', [
    {
      supplyId: 2,
      operatorId: 1,
      recipientId: 1,
      address_line: null,
      ward: 'string',
      district: 'string',
      city_province: 'string',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Deliveries', null, {});
}
