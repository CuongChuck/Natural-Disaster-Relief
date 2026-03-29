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

  getAll = async (offset, limit) => {
    try {
      return await this.db.sequelize.query(
        `SELECT "Supply"."id", "Supply"."name", "Supply"."quantity",
        "Supply"."count", "Supply"."category", "Supply"."unit", "Supply"."address_line",
        "Supply"."ward", "Supply"."district", "Supply"."city_province", "Supply"."createdAt",
        "Supply"."updatedAt", "Users"."username" AS "donor", "Supply"."proof"
        FROM "Supplies" AS "Supply"
        LEFT OUTER JOIN "Users" ON "Supply"."donorId" = "Users"."id"
        LIMIT ${limit}
        OFFSET ${offset};`,
        { type: this.db.sequelize.QueryTypes.SELECT, }
      );
    }
    catch (err) {
      throw new Error("Supplies retrieval failed: " + err.message);
    }
  }

  getOne = async (data) => {
    try {
      const result = await this.db.sequelize.query(
        `SELECT "Supply"."id", "Supply"."name", "Supply"."quantity",
        "Supply"."count", "Supply"."category", "Supply"."unit", "Supply"."address_line",
        "Supply"."ward", "Supply"."district", "Supply"."city_province", "Supply"."createdAt",
        "Supply"."updatedAt", "Users"."username" AS "donor", "Supply"."proof"
        FROM "Supplies" AS "Supply"
        LEFT OUTER JOIN "Users" ON "Supply"."donorId" = "Users"."id"
        WHERE "Supply"."id" = ${data.id};`,
        { type: this.db.sequelize.QueryTypes.SELECT, }
      );
      return result[0];
    }
    catch (err) {
      throw new Error("Supply retrieval failed: " + err.message);
    }
  }

  getMine = async (data) => {
    try {
      return await this.db.sequelize.query(
        `SELECT "Supply"."id", "Supply"."name", "Supply"."quantity",
        "Supply"."count", "Supply"."category", "Supply"."unit", "Supply"."address_line",
        "Supply"."ward", "Supply"."district", "Supply"."city_province", "Supply"."createdAt",
        "Supply"."updatedAt", "Users"."username" AS "donor", "Supply"."proof"
        FROM "Supplies" AS "Supply"
        LEFT OUTER JOIN "Users" ON "Supply"."donorId" = "Users"."id"
        WHERE "Supply"."donorId" = ${data.donorId}
        LIMIT ${data.limit}
        OFFSET ${data.offset};`,
        { type: this.db.sequelize.QueryTypes.SELECT, }
      );
    } catch (err) {
      throw new Error("Supply retrieval failed: " + err.message);
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
      throw new Error("Supply creation failed: " + err.message);
    }
  }

  addProof = async (data) => {
    try {
      await this.Supply.update({
        proof: data.proof
      }, { where: { id: data.id }, },);
    } catch (err) {
      throw new Error("Photo proof addition failed: " + err.message);
    }
  }
}

export default SupplySqlRepository;