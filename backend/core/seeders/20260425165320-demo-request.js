'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Requests', [
    {
      recipientId: 1,
      name: "Chăn cứu trợ",
      quantity: 1,
      category: 4,
      unit: 4,
      status: 1,
      priority: 'Thấp',
      ward: "Phường Hà Huy Tập",
      district: "Thành phố Vinh",
      city_province: "Tỉnh Nghệ An",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipientId: 1,
      name: "Gạo",
      quantity: 10,
      category: 2,
      unit: 1,
      status: 1,
      priority: 'Cao',
      ward: "Xã Kim Hóa",
      district: "Huyện Tuyên Hóa",
      city_province: "Tỉnh Quảng Bình",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipientId: 1,
      name: "Tiền mặt",
      quantity: 200000,
      category: 5,
      unit: 5,
      status: 1,
      priority: 'Trung bình',
      ward: "Phường Phong Phú",
      district: "Thị xã Phong Điền",
      city_province: "Thành phố Huế",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipientId: 1,
      name: "Cơm hộp",
      quantity: 1,
      category: 2,
      unit: 3,
      status: 1,
      priority: 'Cao',
      ward: "Thị trấn Tây Sơn",
      district: "Huyện Hương Sơn",
      city_province: "Tỉnh Hà Tĩnh",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      recipientId: 1,
      name: "Tiền mặt",
      quantity: 500000,
      category: 5,
      unit: 5,
      status: 1,
      priority: 'Trung bình',
      ward: "Xã Phú Thuận",
      district: "Huyện Phú Vang",
      city_province: "Thành phố Huế",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Requests', null, {});
}
