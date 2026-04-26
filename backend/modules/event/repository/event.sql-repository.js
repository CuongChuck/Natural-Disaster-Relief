import IEventRepository from './event.interface-repository.js';
import { IEventStorageRepository } from './event.interface-storage-repository.js';

export default class EventSqlRepository extends IEventStorageRepository(IEventRepository) {
  constructor({ db, Event, SupplyEvent }) {
    super();
    this.Event = Event;
    this.SupplyEvent = SupplyEvent;
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
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("All events retrieval failed: " + errors);
    }
  }

  countAll = async () => {
    try {
      return await this.Event.count();
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("All events count failed: " + errors);
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
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("All events retrieved by supply failed: " + errors);
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
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("My events retrieval failed: " + errors);
    }
  }

  countMine = async (data) => {
    try {
      return await this.Event.count({
        where: {
          userId: data.userId
        }
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("My events count failed: " + errors);
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
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Supplies ids retrieved by event failed: " + errors);
    }
  }

  getOne = async (data) => {
    try {
      return await this.Event.findByPk(data.id);
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Event retrieval failed: " + errors);
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
      const records = data.supplies.map(id => ({
        eventId: event.id,
        supplyId: id
      }));
      await this.SupplyEvent.bulkCreate(records);
      return event;
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Event creation failed: " + errors);
    }
  }
}