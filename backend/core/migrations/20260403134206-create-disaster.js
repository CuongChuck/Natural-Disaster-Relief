'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.sequelize.query(`
    CREATE EXTENSION IF NOT EXISTS postgis;
    CREATE EXTENSION IF NOT EXISTS postgis_topology;
  `);

  await queryInterface.createTable('Disasters', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    type: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    area: {
      type: Sequelize.GEOMETRY('GEOMETRY', 4326),
      allowNull: false
    },
    severity: {
      type: Sequelize.ENUM('Thấp', 'Trung bình', 'Cao'),
      allowNull: false
    },
    address_line: {
      type: Sequelize.STRING
    },
    ward: {
      type: Sequelize.STRING,
      allowNull: false
    },
    district: {
      type: Sequelize.STRING,
      allowNull: false
    },
    city_province: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });

  await queryInterface.addIndex('Disasters', ['userId']);

  await queryInterface.sequelize.query(`
    ALTER TABLE "Disasters"
    ADD CONSTRAINT "check_geometry_type"
    CHECK (ST_GeometryType(area) IN ('ST_Polygon', 'ST_MultiPolygon'));
  `);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Disasters');
}