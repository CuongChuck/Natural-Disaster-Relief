'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Users', [
    {
      email: 'a@mail.com',
      username: 'admin',
      password: '$2b$10$7CWJwII9CQvV5Rs6Ou/PR.F2wBXzIZ5GTQT6rdMqpb.54jisYI1iu',
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
      password: '$2b$10$bll/CsO/R.6ab.xaoFvxz.YhM46GqcelOvgfsmqgrrhAQZVeLPa5q',
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
