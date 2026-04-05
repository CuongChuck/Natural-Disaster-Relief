import IEventRepository from './event.interface-repository.js';
import { IEventStorageRepository } from './event.interface-storage-repository.js';

export default class EventSqlRepository extends IEventStorageRepository(IEventRepository) {
  constructor({ db, Event }) {
    super();
    this.Event = Event;
    this.db = db;
  }

  getAll = async (offset, limit) => {
    try {
      return await this.db.sequelize.query(`
        SELECT E."id", E."name", E."description", E."startTime", E."address_line",
        E."ward", E."district", E."city_province", E."createdAt", E."updatedAt",
        U."name" AS "user", COUNT(SE."supplyId") AS total_supplies
        FROM "Events" E
        LEFT JOIN "SupplyEvent" SE ON E."id" = SE."eventId"
        LEFT JOIN "Users" U ON E."userId" = U."id"
        GROUP BY E."id", U."name"
        LIMIT ${limit}
        OFFSET ${offset};`,
        { type: this.db.sequelize.QueryTypes.SELECT },
      );
    }
    catch (err) {
      throw new Error("Events retrieval failed: " + err.message);
    }
  }

  getBySupply = async (data) => {
    try {
      return await this.db.sequelize.query(`
        SELECT E."id", E."name", E."description", E."startTime", E."address_line",
        E."ward", E."district", E."city_province", E."createdAt", E."updatedAt",
        U."name" AS "user", COUNT(SE."supplyId") AS total_supplies
        FROM "Events" E
        LEFT JOIN "SupplyEvent" SE ON E."id" = SE."eventId"
        LEFT JOIN "Users" U ON E."userId" = U."id"
        WHERE SE."supplyId" = ${data.supplyId}
        GROUP BY E."id", U."name"
        ORDER BY E."createdAt" ASC
        LIMIT ${data.limit}
        OFFSET ${data.offset};`,
        { type: this.db.sequelize.QueryTypes.SELECT },
      );
    }
    catch (err) {
      throw new Error("Events retrieval failed: " + err.message);
    }
  }

  getMine = async (data) => {
    try {
      return await this.db.sequelize.query(`
        SELECT E."id", E."name", E."description", E."startTime", E."address_line",
        E."ward", E."district", E."city_province", E."createdAt", E."updatedAt",
        U."name" AS "user", COUNT(SE."supplyId") AS total_supplies
        FROM "Events" E
        LEFT JOIN "SupplyEvent" SE ON E."id" = SE."eventId"
        LEFT JOIN "Users" U ON E."userId" = U."id"
        WHERE E."userId" = ${data.userId}
        GROUP BY E."id", U."name"
        LIMIT ${data.limit}
        OFFSET ${data.offset};`,
        { type: this.db.sequelize.QueryTypes.SELECT },
      );
    }
    catch (err) {
      throw new Error("My events retrieval failed: " + err.message);
    }
  }

  getSupplyIds = async (data) => {
    try {
      return await this.db.sequelize.query(`
        SELECT SE."supplyId"
        FROM "SupplyEvent" SE
        WHERE SE."eventId" = ${data.eventId}
        LIMIT ${data.limit}
        OFFSET ${data.offset};`,
        { type: this.db.sequelize.QueryTypes.SELECT },
      );
    } catch (err) {
      throw new Error('Supply ids retrieval failed: ' + err.message);
    }
  }

  getOne = async (data) => {
    try {
      return await this.Event.findByPk(data.id);
    }
    catch (err) {
      throw new Error(`Event ${data.id} retrieval failed: ` + err.message);
    }
  }

  create = async (data) => {
    try {
      const event = await this.Event.create({
        userId: data.userId,
        description: data.description,
        name: data.name,
        startTime: data.startTime || new Date(),
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province
      });
      if (data.supplies) await event.setSupplies(data.supplies);
      return event;
    } catch (err) {
      throw new Error('Error in creating new event: ' + err.message);
    }
  }
}