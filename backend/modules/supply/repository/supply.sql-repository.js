import ISupplyRepository from './supply.interface-repository.js';
import { ISupplyStorageRepository } from "./supply.interface-storage-repository.js";

import { Op } from 'sequelize';

class SupplySqlRepository extends ISupplyStorageRepository(ISupplyRepository) {
  constructor({ Supply, Event, User, SupplyReview, db }) {
    super();
    this.Supply = Supply;
    this.SupplyReview = SupplyReview;
    this.Event = Event;
    this.User = User;
    this.db = db;
  }

  checkDeliverability = async (data) => {
    try {
      const supply = await this.Supply.findOne({
        where: {
          id: data.id
        }
      });
      if (supply.status !== 3) throw new Error('Kiện hàng chưa đủ điều kiện để vận chuyển');
      // if (!supply.proof_url) throw new Error('Chưa có hình ảnh minh chứng kiện hàng');
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Supply deliverability check failed: " + errors);
    }
  }

  checkOwner = async (data) => {
    try {
      const supply = await this.Supply.findOne({
        where: {
          id: data.id,
          donorId: data.donorId
        }
      });
      if (supply.length === 0) throw new Error('Người dùng không được chỉnh sửa kiện hàng');
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Supply owner check failed: " + errors);
    }
  }

  getAll = async (data) => {
    try {
      const order = data.order ? ` ORDER BY S."status" ${data.order}` : '';
      let query = `
        WITH LatestRecords AS (
          SELECT DISTINCT ON (S."id")
            S."id", 
            J."dest_ward", 
            J."dest_district", 
            J."dest_city_province",
            E."updatedAt" as "event_updated_at"
          FROM "Supplies" AS S
          LEFT JOIN "SupplyEvent" SE ON S."id" = SE."supplyId"
          LEFT JOIN "Events" E ON SE."eventId" = E."id"
          LEFT JOIN "Journeys" J ON J."eventId" = E."id"
          ORDER BY S."id", E."updatedAt" DESC
        )
        SELECT S."id", S."name", S."quantity", S."status",
          S."count", S."category", S."unit", S."address_line",
          S."ward", S."district", S."city_province", S."createdAt",
          S."updatedAt", "Users"."username" AS "donor", S."proof_url" AS proof
        FROM "Supplies" AS S
        LEFT JOIN "Users" ON S."donorId" = "Users"."id"
        JOIN LatestRecords LR ON S."id" = LR."id"
      `;
      const conditions = [];
      const replacements = {
        limit: data.limit,
        offset: data.offset
      };
      if (data.status) {
        conditions.push('S."status" IN (:status)');
        replacements.status = data.status;
      }
      if (data.category) {
        conditions.push('S."category" = :category');
        replacements.category = data.category;
      }
      if (typeof data.ward !== 'undefined' || typeof data.district !== 'undefined' || typeof data.city_province !== 'undefined') {
        if (data.ward === '' && data.district === '' && data.city_province === '') {
          conditions.push('LR."dest_ward" IS NULL AND LR."dest_district" IS NULL AND LR."dest_city_province" IS NULL');
        } else {
          const locCond = [];
          if (data.ward) {
            locCond.push('LR."dest_ward" = :ward');
            replacements.ward = data.ward;
          }
          if (data.district) {
            locCond.push('LR."dest_district" = :district');
            replacements.district = data.district;
          }
          if (data.city_province) {
            locCond.push('LR."dest_city_province" = :city_province');
            replacements.city_province = data.city_province;
          }
          if (locCond.length > 0) conditions.push(`(${locCond.join(' AND ')})`);
        }
      }
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
      query += order + ' LIMIT :limit OFFSET :offset';
      return await this.db.sequelize.query(query, {
        replacements,
        type: this.db.sequelize.QueryTypes.SELECT,
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("All supplies retrieval failed: " + errors);
    }
  }

  countAll = async (data) => {
    try {
      const whereClause = {};
      if (data.status) {
        const status = Array.isArray(data.status) ? data.status : [data.status];
        whereClause.status = { [Op.in]: status };
      }
      return await this.Supply.count({ whereClause });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("All supplies count failed: " + errors);
    }
  }

  getOne = async (data) => {
    try {
      const result = await this.db.sequelize.query(
        `SELECT S."id", S."name", S."quantity", S."status",
        S."count", S."category", S."unit", S."address_line",
        S."ward", S."district", S."city_province", S."createdAt",
        S."updatedAt", "Users"."username" AS "donor", S."proof_url"  AS proof
        FROM "Supplies" AS S
        LEFT OUTER JOIN "Users" ON S."donorId" = "Users"."id"
        WHERE S."id" = :id;`,
        {
          replacements: { id: data.id },
          type: this.db.sequelize.QueryTypes.SELECT,
        }
      );
      if (result.length === 0) throw new Error('Supply not found');
      return result[0];
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Supply retrieval failed: " + errors);
    }
  }

  getMine = async (data) => {
    try {
      const order = data.order ? ` ORDER BY S."status" ${data.order}` : '';
      let query = `SELECT S."id", S."name", S."quantity", S."status",
        S."count", S."category", S."unit", S."address_line",
        S."ward", S."district", S."city_province", S."createdAt",
        S."updatedAt", "Users"."username" AS "donor", S."proof_url" AS proof
        FROM "Supplies" AS S
        LEFT OUTER JOIN "Users" ON S."donorId" = "Users"."id"
        WHERE S."donorId" = :donorId`;
      if (data.status) query += ' AND S."status" IN (:status)';
      query += order + ' LIMIT :limit OFFSET :offset';
      return await this.db.sequelize.query(query, {
        replacements: {
          donorId: data.donorId,
          status: data.status,
          limit: data.limit,
          offset: data.offset
        },
        type: this.db.sequelize.QueryTypes.SELECT,
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("My supplies retrieval failed: " + errors);
    }
  }

  countMine = async (data) => {
    try {
      const whereClause = data.status ?
        { donorId: data.donorId, status: { [Op.in]: data.status } } :
        { donorId: data.donorId };
      return await this.Supply.count({ where: whereClause });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("My supplies count failed: " + errors);
    }
  }

  getReview = async (data) => {
    try {
      const result = await this.db.sequelize.query(
        `SELECT SR."id", SR."name", SR."quantity",
        SR."count", SR."category", SR."unit", SR."address_line",
        SR."ward", SR."district", SR."city_province", SR."createdAt",
        SR."updatedAt", R."username" AS "reviewer", D."username" AS "donor"
        FROM "SupplyReviews" SR
        LEFT OUTER JOIN "Supplies" S ON SR."supplyId" = S."id"
        LEFT OUTER JOIN "Users" D ON S."donorId" = D."id"
        LEFT OUTER JOIN "Users" R ON SR."reviewerId" = R."id"
        WHERE SR."supplyId" = :id;`,
        {
          replacements: { id: data.id },
          type: this.db.sequelize.QueryTypes.SELECT,
        }
      );
      return result[0];
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Supply review retrieval failed: " + errors);
    }
  }

  create = async (data) => {
    try {
      return await this.Supply.create({
        category: data.category,
        unit: data.unit,
        donorId: data.donorId,
        name: data.name,
        count: data.count,
        quantity: data.quantity,
        status: 1,
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Supply creation failed: " + errors);
    }
  }

  review = async (data) => {
    try {
      await this.SupplyReview.create({
        category: data.category,
        unit: data.unit,
        name: data.name,
        count: data.count,
        quantity: data.quantity,
        reviewerId: data.reviewerId,
        supplyId: data.id,
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Supply review creation failed: " + errors);
    }
  }

  edit = async (data) => {
    try {
      await this.Supply.update({
        category: data.category,
        unit: data.unit,
        name: data.name,
        count: data.count,
        quantity: data.quantity,
        status: 1,
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province
      }, { where: { id: data.id, status: { [Op.in]: [1,2] } } });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Supply edit failed: " + errors);
    }
  }

  updateStatus = async (data) => {
    try {
      await this.Supply.update({
        status: data.status
      }, { where: { id: data.id } });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Supply update status failed: " + errors);
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
      throw new Error("Supply proof addition failed: " + errors);
    }
  }

  delete = async (data) => {
    try {
      await this.Supply.destroy({ where: { id: data.id, status: { [Op.in]: [1,2] } }, force: true });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Supply deletion failed: " + errors);
    }
  }
}

export default SupplySqlRepository;