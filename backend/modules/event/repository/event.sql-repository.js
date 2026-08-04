import IEventRepository from './event.interface-repository.js';
import { IEventStorageRepository } from './event.interface-storage-repository.js';

export default class EventSqlRepository extends IEventStorageRepository(IEventRepository) {
  constructor({ db, Event, SupplyEvent, Journey }) {
    super();
    this.Event = Event;
    this.SupplyEvent = SupplyEvent;
    this.Journey = Journey;
    this.db = db;
  }

  getSupplyIds = async (data) => {
    try {
      return await this.SupplyEvent.findAll({ 
        attributes: [ 'supplyId' ],
        where: {
          eventId: data.id
        },
        raw: true
      });
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("All events retrieval failed: " + errors);
    }
  }

  getAll = async (offset, limit) => {
    try {
      return await this.db.sequelize.query(`
        SELECT 
          E."id", E."name", E."description", E."startTime", E."address_line", 
          E."ward", E."district", E."city_province", J."plate", J."isCompleted",
          J."endTime", J."dest_address_line", J."dest_ward", J."dest_district",
          J."dest_city_province", U."name" AS user, E."createdAt", E."updatedAt"
        FROM "Events" E
        LEFT JOIN "Journeys" J ON J."eventId" = E."id"
        LEFT JOIN "Users" U ON U."id" = E."userId"
        ORDER BY J."isCompleted" ASC
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
        SELECT 
          E."id", E."name", E."description", E."startTime", E."address_line", 
          E."ward", E."district", E."city_province", J."plate", J."isCompleted",
          J."endTime", J."dest_address_line", J."dest_ward", J."dest_district",
          J."dest_city_province", U."name" AS user, E."createdAt", E."updatedAt"
        FROM "Events" E
        LEFT JOIN "Journeys" J ON J."eventId" = E."id"
        LEFT JOIN "SupplyEvent" SE ON SE."eventId" = E."id"
        LEFT JOIN "Users" U ON U."id" = E."userId"
        WHERE SE."supplyId" = :supplyId
        ORDER BY E."createdAt" ASC;`,
        {
          replacements: { supplyId: data.supplyId },
          type: this.db.sequelize.QueryTypes.SELECT
        },
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
        SELECT 
          E."id", E."name", E."description", E."startTime", E."address_line", 
          E."ward", E."district", E."city_province", J."plate", J."isCompleted",
          J."endTime", J."dest_address_line", J."dest_ward", J."dest_district",
          J."dest_city_province", U."name" AS user, E."createdAt", E."updatedAt"
        FROM "Events" E
        LEFT JOIN "Journeys" J ON J."eventId" = E."id"
        LEFT JOIN "Users" U ON U."id" = E."userId"
        WHERE E."userId" = :userId
        ORDER BY J."isCompleted" ASC
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

  getOne = async (data) => {
    try {
      const result = await this.db.sequelize.query(`
        SELECT 
          E."id", E."name", E."description", E."startTime", E."address_line", 
          E."ward", E."district", E."city_province", J."plate", J."isCompleted",
          J."endTime", J."dest_address_line", J."dest_ward", J."dest_district",
          J."dest_city_province", E."createdAt", E."updatedAt",
          (SELECT json_build_object(
            'name', U."name", 
            'email', U."email", 
            'phone', U."phone", 
            'role', U."role"
          ) FROM "Users" U WHERE U."id" = E."userId") AS user,
          (SELECT json_agg(supply_data) FROM (
            SELECT 
              S."id", S."name", S."quantity", S."count", S."category", S."unit", 
              S."address_line", S."ward", S."district", S."city_province", 
              S."createdAt", S."updatedAt", S."proof_url" AS proof,
              D."username" AS donor, S."status"
            FROM "Supplies" S 
            LEFT JOIN "SupplyEvent" SE ON S."id" = SE."supplyId" 
            LEFT JOIN "Users" D ON S."donorId" = D."id"
            WHERE SE."eventId" = E."id"
          ) supply_data) AS supplies
        FROM "Events" E
        LEFT JOIN "Journeys" J ON J."eventId" = E."id"
        WHERE E."id" = :id;`,
      {
        replacements: { id: data.id },
        type: this.db.sequelize.QueryTypes.SELECT
      });
      if (result.length === 0) throw new Error('Event not found');
      return result[0];
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

  createJourney = async (data) => {
    try {
      await this.Journey.create({
        eventId: data.id,
        plate: data.plate,
        dest_address_line: data.dest_address_line,
        dest_ward: data.dest_ward,
        dest_district: data.dest_district,
        dest_city_province: data.dest_city_province
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Journey creation failed: " + errors);
    }
  }

  editJourney = async (data) => {
    try {
      await this.Journey.update({
        plate: data.plate,
        dest_address_line: data.dest_address_line,
        dest_ward: data.dest_ward,
        dest_district: data.dest_district,
        dest_city_province: data.dest_city_province
      }, { where: { eventId: data.id } });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Journey edit failed: " + errors);
    }
  }

  edit = async (data) => {
    try {
      await this.Event.update({
        description: data.description,
        startTime: data.startTime || new Date(),
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province
      }, { where: { id: data.id } });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Event edit failed: " + errors);
    }
  }

  completeJourney = async (data) => {
    try {
      await this.Journey.update({
        isCompleted: true,
        endTime: new Date()
      }, { where: { eventId: data.id } });
      await this.Event.update({
        updatedAt: new Date()
      }, { where: { id: data.id } });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Journey status update failed: " + errors);
    }
  }

  delete = async (data) => {
    try {
      await this.Event.destroy({ where: { id: data.id }, force: true });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Event deletion failed: " + errors);
    }
  }
}