'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Supplies', [
    {
      CategoryId: 4,
      UnitId: 4,
      UserId: 1,
      name: "Chăn cứu trợ",
      quantity: 1,
      count: 100,
      expected_ward: "Nghệ An",
      expected_district: "Nghệ An",
      expected_city_province: "Nghệ An",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      CategoryId: 2,
      UnitId: 1,
      UserId: 1,
      name: "Gạo",
      quantity: 10,
      count: 50,
      expected_ward: "Quảng Bình",
      expected_district: "Quảng Bình",
      expected_city_province: "Quảng Bình",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      CategoryId: 6,
      UnitId: 5,
      UserId: 1,
      name: "Tiền mặt",
      quantity: 200000,
      count: 1,
      expected_ward: "Huế",
      expected_district: "Huế",
      expected_city_province: "Huế",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      CategoryId: 2,
      UnitId: 3,
      UserId: 1,
      name: "Cơm hộp",
      quantity: 1,
      count: 100,
      expected_ward: "Hà Tĩnh",
      expected_district: "Hà Tĩnh",
      expected_city_province: "Hà Tĩnh",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      CategoryId: 6,
      UnitId: 5,
      UserId: 1,
      name: "Tiền mặt",
      quantity: 500000,
      count: 1,
      expected_ward: "Huế",
      expected_district: "Huế",
      expected_city_province: "Huế",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Supplies', null, {});
}
