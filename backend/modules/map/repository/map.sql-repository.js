import IMapRepository from './map.interface-repository.js';
import { IMapStorageRepository } from './map.interface-storage-repository.js';

export default class MapSqlRepository extends IMapStorageRepository(IMapRepository) {
  constructor({ db, Disaster }) {
    super();
    this.Disaster = Disaster;
    this.db = db;
  }

  getCreator = async (data) => {
    try {
      return this.Disaster.findByPk(data.id, {
        attributes: ['userId'], raw: true
      });
    } catch (err) {
      const errors = err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') || null;
      throw new Error("Get disaster creator failed: " + (errors || err.message));
    }
  }

  deleteDisaster = async (data) => {
    try {
      await this.Disaster.destroy({ where: { id: data.id }, force: true });
    } catch (err) {
      const errors = err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') || null;
      throw new Error("Delete disaster failed: " + (errors || err.message));
    }
  }

  getAllDisasters = async (offset, limit) => {
    try {
      return await this.db.sequelize.query(`
        SELECT D."id", D."name", D."description", D."type", D."severity", D."address_line",
        D."ward", D."district", D."city_province", D."createdAt", D."updatedAt",
        U."name" AS "user", (ST_AsGeoJSON(D."area")::json)->'coordinates' AS area
        FROM "Disasters" D
        LEFT JOIN "Users" U ON D."userId" = U."id"
        LIMIT ${limit}
        OFFSET ${offset};`,
        { type: this.db.sequelize.QueryTypes.SELECT },
      );
    }
    catch (err) {
      const errors = err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') || null;
      throw new Error("Disasters retrieval failed: " + (errors || err.message));
    }
  }

  getMyDisasters = async (data) => {
    try {
      return await this.db.sequelize.query(`
        SELECT D."id", D."name", D."description", D."type", D."severity", D."address_line",
        D."ward", D."district", D."city_province", D."createdAt", D."updatedAt",
        U."name" AS "user", (ST_AsGeoJSON(D."area")::json)->'coordinates' AS area
        FROM "Disasters" D
        LEFT JOIN "Users" U ON D."userId" = U."id"
        WHERE D."userId" = ${data.userId}
        LIMIT ${data.limit}
        OFFSET ${data.offset};`,
        { type: this.db.sequelize.QueryTypes.SELECT },
      );
    }
    catch (err) {
      const errors = err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') || null;
      throw new Error("Disasters retrieval failed: " + (errors || err.message));
    }
  }

  getOneDisaster = async (data) => {
    try {
      return await this.db.sequelize.query(`
        SELECT D."id", D."name", D."description", D."type", D."severity", D."address_line",
        D."ward", D."district", D."city_province", D."createdAt", D."updatedAt",
        U."name" AS "user name", U."email" AS "user email",
        U."phone" AS "user phone", U."role" AS "user role",
        (ST_AsGeoJSON(D."area")::json)->'coordinates' AS area
        FROM "Disasters" D
        LEFT JOIN "Users" U ON D."userId" = U."id"
        WHERE D."id" = ${data.id};`,
        { type: this.db.sequelize.QueryTypes.SELECT },
      );
    }
    catch (err) {
      const errors = err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') || null;
      throw new Error(`Disaster ${data.id} retrieval failed: ` + (errors || err.message));
    }
  }

  createDisaster = async (data) => {
    try {
      const disaster = await this.Disaster.create({
        userId: data.userId,
        description: data.description,
        name: data.name,
        area: this.db.sequelize.fn(
          'ST_GeomFromGeoJSON',
          JSON.stringify({
            type: 'Polygon',
            coordinates: data.area
          })
        ),
        severity: data.severity,
        type: data.type,
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province
      });
      return await this.getOneDisaster({ id: disaster.id });
    } catch (err) {
      const errors = err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') || null;
      throw new Error('Error in creating new disaster: ' + (errors || err.message));
    }
  }

  updateDisaster = async (data) => {
    try {
      await this.Disaster.update({
        description: data.description,
        name: data.name,
        area: this.db.sequelize.fn(
          'ST_GeomFromGeoJSON',
          JSON.stringify({
            type: 'Polygon',
            coordinates: data.area
          })
        ),
        severity: data.severity,
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province
      }, { where: { id: data.id } });
    } catch (err) {
      const errors = err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') || null;
      throw new Error('Error in editing disaster: ' + (errors || err.message));
    }
  }
}