'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Disasters', [
    {
      userId: 1,
      name: 'Lũ quét Sa Pa',
      description: null,
      area: Sequelize.fn(
        'ST_GeomFromGeoJSON', 
        JSON.stringify({
          type: 'Polygon',
          coordinates: [
            [
              [103.84, 22.33],
              [103.86, 22.33],
              [103.86, 22.35],
              [103.84, 22.35],
              [103.84, 22.33]
            ]
          ]
        })
      ),
      type: 1,
      severity: 'Cao',
      address_line: null,
      ward: 'Sa Pa',
      district: 'Sa Pa',
      city_province: 'Lào Cai',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Disasters', null, {});
}
