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
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Disaster recorder retrieval failed: " + errors);
    }
  }

  deleteDisaster = async (data) => {
    try {
      await this.Disaster.destroy({ where: { id: data.id }, force: true });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Disaster deletion failed: " + errors);
    }
  }

  getAllDisasters = async (offset, limit) => {
    try {
      return await this.db.sequelize.query(`
        SELECT D."id", D."name", D."description", D."type", D."severity", D."address_line",
        D."ward", D."district", D."city_province", D."createdAt", D."updatedAt",
        U."name" AS "user", ST_AsGeoJSON(D."area")::json AS area,
		    ST_AsGeoJSON(ST_PointOnSurface(D."area"))::json AS center
        FROM "Disasters" D
        LEFT JOIN "Users" U ON D."userId" = U."id"
        LIMIT :limit OFFSET :offset;`,
        {
          replacements: {
            limit: limit,
            offset: offset
          },
          type: this.db.sequelize.QueryTypes.SELECT
        },
      );
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("All disasters retrieval failed: " + errors);
    }
  }

  countAllDisasters = async () => {
    try {
      return await this.Disaster.count();
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("All disasters count failed: " + errors);
    }
  }

  getMyDisasters = async (data) => {
    try {
      return await this.db.sequelize.query(`
        SELECT D."id", D."name", D."description", D."type", D."severity", D."address_line",
        D."ward", D."district", D."city_province", D."createdAt", D."updatedAt",
        U."name" AS "user", ST_AsGeoJSON(D."area")::json AS area,
        ST_AsGeoJSON(ST_PointOnSurface(D."area"))::json AS center
        FROM "Disasters" D
        LEFT JOIN "Users" U ON D."userId" = U."id"
        WHERE D."userId" = :userId
        LIMIT :limit OFFSET :offset;`,
        {
          replacements: {
            userId: data.userId,
            limit: data.limit,
            offset: data.offset
          },
          type: this.db.sequelize.QueryTypes.SELECT
        },
      );
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("My disasters retrieval failed: " + errors);
    }
  }

  countMyDisasters = async (data) => {
    try {
      return await this.Disaster.count({
        where: {
          userId: data.userId
        }
      });
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("My disasters count failed: " + errors);
    }
  }

  getOneDisaster = async (data) => {
    try {
      const result = await this.db.sequelize.query(`
        SELECT D."id", D."name", D."description", D."type", D."severity", D."address_line",
        D."ward", D."district", D."city_province", D."createdAt", D."updatedAt",
        U."name" AS "user_name", U."email" AS "user_email",
        U."phone" AS "user_phone", U."role" AS "user_role",
        ST_AsGeoJSON(D."area")::json AS area,
        ST_AsGeoJSON(ST_PointOnSurface(D."area"))::json AS center
        FROM "Disasters" D
        LEFT JOIN "Users" U ON D."userId" = U."id"
        WHERE D."id" = :id;`,
        {
          replacements: { id: data.id },
          type: this.db.sequelize.QueryTypes.SELECT
        },
      );
      if (result.length === 0) throw new Error('Disaster not found');
      return result[0];
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Disaster retrieval failed: " + errors);
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
          JSON.stringify(data.area)
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
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Disaster creation failed: " + errors);
    }
  }

  updateDisaster = async (data) => {
    try {
      await this.Disaster.update({
        description: data.description,
        name: data.name,
        area: this.db.sequelize.fn(
          'ST_GeomFromGeoJSON',
          JSON.stringify(data.area)
        ),
        severity: data.severity,
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province
      }, { where: { id: data.id } });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Disaster edit failed: " + errors);
    }
  }
}