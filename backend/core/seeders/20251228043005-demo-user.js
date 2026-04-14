'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Users', [
    {
      email: 'a@mail.com',
      username: 'admin',
      password: '$2b$10$jnjn1yHc.4XqOL7.WT8.0uBfHF53/a/bakX7DzJm1fU/kcEJQgpaW',
      name: 'admin',
      phone: "0123456789",
      ward: "string",
      district: "string",
      city_province: "string",
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'b@mail.com',
      username: 'vol1',
      password: '$2b$10$okIDv0CfZmjzPjgG5AUBq.OGlac2L2rHdW9x5QmnnSdyW25KbaE82',
      name: 'volunteer',
      phone: "0987654321",
      ward: "string",
      district: "string",
      city_province: "string",
      role: "VOLUNTEER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Users', null, {});
}
