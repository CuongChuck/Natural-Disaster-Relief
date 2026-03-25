'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Supplies', [
    {
      UserId: 1,
      name: "Chăn cứu trợ",
      quantity: 1,
      category: "4",
      unit: "4",
      count: 100,
      ward: "Nghệ An",
      district: "Nghệ An",
      city_province: "Nghệ An",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      UserId: 1,
      name: "Gạo",
      quantity: 10,
      category: "2",
      unit: "1",
      count: 50,
      ward: "Quảng Bình",
      district: "Quảng Bình",
      city_province: "Quảng Bình",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      UserId: 1,
      name: "Tiền mặt",
      quantity: 200000,
      category: "5",
      unit: "5",
      count: 1,
      ward: "Huế",
      district: "Huế",
      city_province: "Huế",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      UserId: 1,
      name: "Cơm hộp",
      quantity: 1,
      category: "2",
      unit: "3",
      count: 100,
      ward: "Hà Tĩnh",
      district: "Hà Tĩnh",
      city_province: "Hà Tĩnh",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      UserId: 1,
      name: "Tiền mặt",
      quantity: 500000,
      category: "5",
      unit: "5",
      count: 1,
      ward: "Huế",
      district: "Huế",
      city_province: "Huế",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Supplies', null, {});
}
