import ISupplyRepository from './supply.interface-repository.js';
import { ISupplyStorageRepository } from "./supply.interface-storage-repository.js";

class SupplySqlRepository extends ISupplyStorageRepository(ISupplyRepository) {
  constructor({ Supply, Event, User, db }) {
    super();
    this.Supply = Supply;
    this.Event = Event;
    this.User = User;
    this.db = db;
  }

  getAll = async (data) => {
    try {
      return await this.db.sequelize.query(
        `SELECT S."id", S."name", S."quantity",
        S."count", S."category", S."unit", S."address_line",
        S."ward", S."district", S."city_province", S."createdAt",
        S."updatedAt", "Users"."username" AS "donor", S."proof_url" AS proof
        FROM "Supplies" AS S
        LEFT OUTER JOIN "Users" ON S."donorId" = "Users"."id"
        LIMIT ${data.limit}
        OFFSET ${data.offset};`,
        { type: this.db.sequelize.QueryTypes.SELECT, }
      );
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("User retrieval failed: " + errors);
    }
  }

  countAll = async () => {
    try {
      return await this.Supply.count();
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("User retrieval failed: " + errors);
    }
  }

  getOne = async (data) => {
    try {
      const result = await this.db.sequelize.query(
        `SELECT S."id", S."name", S."quantity",
        S."count", S."category", S."unit", S."address_line",
        S."ward", S."district", S."city_province", S."createdAt",
        S."updatedAt", "Users"."username" AS "donor", S."proof_url"  AS proof
        FROM "Supplies" AS S
        LEFT OUTER JOIN "Users" ON S."donorId" = "Users"."id"
        WHERE S."id" = ${data.id};`,
        { type: this.db.sequelize.QueryTypes.SELECT, }
      );
      return result[0];
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("User retrieval failed: " + errors);
    }
  }

  getMine = async (data) => {
    try {
      return await this.db.sequelize.query(
        `SELECT S."id", S."name", S."quantity",
        S."count", S."category", S."unit", S."address_line",
        S."ward", S."district", S."city_province", S."createdAt",
        S."updatedAt", "Users"."username" AS "donor", S."proof_url" AS proof
        FROM "Supplies" AS S
        LEFT OUTER JOIN "Users" ON S."donorId" = "Users"."id"
        WHERE S."donorId" = ${data.donorId}
        LIMIT ${data.limit}
        OFFSET ${data.offset};`,
        { type: this.db.sequelize.QueryTypes.SELECT, }
      );
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("User retrieval failed: " + errors);
    }
  }

  countMine = async (data) => {
    try {
      return await this.Supply.count({
        where: {
          donorId: data.donorId
        }
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("User retrieval failed: " + errors);
    }
  }

  getByEvent = async (data) => {
    try {
      return await this.db.sequelize.query(
        `SELECT S."id", S."name", S."quantity",
        S."count", S."category", S."unit", S."address_line",
        S."ward", S."district", S."city_province", S."createdAt",
        S."updatedAt", "Users"."username" AS "donor", S."proof_url" AS proof
        FROM "Supplies" AS S
		    LEFT JOIN "SupplyEvent" SE ON S."id" = SE."supplyId"
        LEFT JOIN "Users" ON S."donorId" = "Users"."id"
        WHERE SE."eventId" = ${data.id}
        LIMIT ${data.limit}
        OFFSET ${data.offset};`,
        {
          type: this.db.sequelize.QueryTypes.SELECT,
        }
      );
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("User retrieval failed: " + errors);
    }
  }

  countByEvent = async (data) => {
    try {
      const result = await this.db.sequelize.query(
        `SELECT COUNT(*)
        FROM "Supplies" AS S
		    LEFT JOIN "SupplyEvent" SE ON S."id" = SE."supplyId"
        WHERE SE."eventId" = ${data.id};`,
        {
          type: this.db.sequelize.QueryTypes.SELECT,
        }
      );
      return result[0]['count'];
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("User retrieval failed: " + errors);
    }
  }

  getIdByEvent = async (data) => {
    try {
      return await this.db.sequelize.query(
        `SELECT SE."supplyId"
        FROM "SupplyEvent" SE
        WHERE SE."eventId" = ${data.id};`,
        {
          type: this.db.sequelize.QueryTypes.SELECT,
        }
      );
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("User retrieval failed: " + errors);
    }
  }

  create = async (data) => {
    try {
      await this.Supply.create({
        id: data.id,
        category: data.category,
        unit: data.unit,
        donorId: data.donorId,
        name: data.name,
        count: data.count,
        quantity: data.quantity,
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("User retrieval failed: " + errors);
    }
  }

  addProof = async (data) => {
    try {
      await this.Supply.update({
        proof_url: data.url,
        proof_public_id: data.public_id
      }, { where: { id: data.id }, },);
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("User retrieval failed: " + errors);
    }
  }
}

export default SupplySqlRepository;