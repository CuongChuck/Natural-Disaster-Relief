'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Events', [
    {
      userId: 1,
      description: null,
      startTime: new Date(),
      name: 4,
      address_line: null,
      ward: "Phường Hà Huy Tập",
      district: "Thành phố Vinh",
      city_province: "Tỉnh Nghệ An",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Events', null, {});
}
