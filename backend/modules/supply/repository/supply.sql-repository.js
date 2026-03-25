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

  async getAll() {
    try {
      return await this.db.sequelize.query(
        `SELECT "Supply"."id", "Supply"."name", "Supply"."quantity",
        "Supply"."count", "Supply"."expected_address_line", "Supply"."expected_ward",
        "Supply"."expected_district", "Supply"."expected_city_province","Supply"."address_line",
        "Supply"."ward", "Supply"."district", "Supply"."city_province", "Supply"."createdAt",
        "Supply"."updatedAt", "Categories"."name" AS "category",
        "Units"."name" AS "unit", "Users"."username" AS "donor"
        FROM "Supplies" AS "Supply"
        LEFT OUTER JOIN "Categories" ON "Supply"."CategoryId" = "Categories"."id"
        LEFT OUTER JOIN "Units" ON "Supply"."UnitId" = "Units"."id"
        LEFT OUTER JOIN "Users" ON "Supply"."UserId" = "Users"."id";`,
        { type: this.db.sequelize.QueryTypes.SELECT, }
      );
    }
    catch (err) {
      throw new Error("Supplies retrieval failed: " + err.message);
    }
  }

  async getMine(data) {
    try {
      return await this.db.sequelize.query(
        `SELECT "Supply"."id", "Supply"."name", "Supply"."quantity",
        "Supply"."count", "Supply"."expected_address_line", "Supply"."expected_ward",
        "Supply"."expected_district", "Supply"."expected_city_province","Supply"."address_line",
        "Supply"."ward", "Supply"."district", "Supply"."city_province", "Supply"."createdAt",
        "Supply"."updatedAt", "Categories"."name" AS "category",
        "Units"."name" AS "unit", "Users"."username" AS "donor"
        FROM "Supplies" AS "Supply"
        LEFT OUTER JOIN "Categories" ON "Supply"."CategoryId" = "Categories"."id"
        LEFT OUTER JOIN "Units" ON "Supply"."UnitId" = "Units"."id"
        LEFT OUTER JOIN "Users" ON "Supply"."UserId" = "Users"."id"
        WHERE "Supply"."UserId" = ${data.userId};`,
        { type: this.db.sequelize.QueryTypes.SELECT, }
      );
    } catch (err) {
      throw new Error("Supply retrieval failed: " + err.message);
    }
  }

  async create(data, transaction) {
    try {
      await this.Supply.create({
        CategoryId: data.category,
        UnitId: data.unit,
        UserId: data.userId,
        name: data.name,
        count: data.count,
        quantity: data.quantity,
        expected_ward: data.ward,
        expected_district: data.district,
        expected_city_province: data.city_province
      }, { transaction });
    } catch (err) {
      throw new Error("Supply creation failed: " + err.message);
    }
  }

  async edit(data, transaction) {
    try {
      await this.Supply.update({
        CategoryId: data.category,
        UnitId: data.unit,
        UserId: data.user,
        name: data.name,
        count: data.count,
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province,
        expected_address_line: data.expected_address_line,
        expected_ward: data.expected_ward,
        expected_district: data.expected_district,
        expected_city_province: data.expected_city_province
      }, { where: { id: data.id } , transaction });
      return await this.db.sequelize.query(
        `SELECT "Supply"."id", "Supply"."name", "Supply"."quantity",
        "Supply"."count", "Supply"."expected_address_line", "Supply"."expected_ward",
        "Supply"."expected_district", "Supply"."expected_city_province","Supply"."address_line",
        "Supply"."ward", "Supply"."district", "Supply"."city_province", "Supply"."createdAt",
        "Supply"."updatedAt", "Categories"."name" AS "category",
        "Units"."name" AS "unit", "Users"."username" AS "donor"
        FROM "Supplies" AS "Supply"
        LEFT OUTER JOIN "Categories" ON "Supply"."CategoryId" = "Categories"."id"
        LEFT OUTER JOIN "Units" ON "Supply"."UnitId" = "Units"."id"
        LEFT OUTER JOIN "Users" ON "Supply"."UserId" = "Users"."id"
        WHERE "Supply"."UserId" = ${data.userId};`,
        { type: this.db.sequelize.QueryTypes.SELECT, }
      );
    } catch (err) {
      throw new Error("Supply edit failed: " + err.message);
    }
  }

  async delete(data, transaction) {
    try {
      await this.Supply.destroy({ where: { id: data.id }, transaction });
    } catch (err) {
      throw new Error("Supply deletion failed: " + err.message);
    }
  }
}

export default SupplySqlRepository;