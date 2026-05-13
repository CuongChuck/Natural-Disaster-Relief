import IRequestRepository from "./request.interface-repository.js";
import { IRequestStorageRepository } from "./request.interface-storage-repository.js";

export default class RequestSqlRepository extends IRequestStorageRepository(IRequestRepository) {
  constructor({ Request, RequestReview, db }) {
    super();
    this.Request = Request;
    this.RequestReview = RequestReview;
    this.db = db;
  }

  checkOwner = async (data) => {
    try {
      const request = await this.Request.findOne({
        where: {
          id: data.id,
          recipientId: data.recipientId
        }
      });
      if (request.length === 0) throw new Error('User is not authorized to modify this request');
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Request owner check failed: " + errors);
    }
  }

  getAll = async (data) => {
    try {
      let query = `SELECT R."id", R."name", R."quantity", R."priority",
        R."status", R."category", R."unit", R."address_line",
        R."ward", R."district", R."city_province", R."createdAt",
        R."updatedAt", "Users"."username" AS "recipient", R."proof_url" AS proof
        FROM "Requests" AS R
        LEFT OUTER JOIN "Users" ON R."recipientId" = "Users"."id"`;
      const conditions = [];
      const replacements = {
        limit: data.limit,
        offset: data.offset
      };
      if (data.status) {
        conditions.push('R."status" = :status');
        replacements.status = data.type;
      }
      if (data.category) {
        conditions.push('R."category" = :category');
        replacements.category = data.category;
      }
      if (data.ward) {
        conditions.push('R."ward" = :ward');
        replacements.ward = data.ward;
      }
      if (data.district) {
        conditions.push('R."district" = :district');
        replacements.district = data.district;
      }
      if (data.city_province) {
        conditions.push('R."city_province" = :city_province');
        replacements.city_province = data.city_province;
      }
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
      query += ' ORDER BY R."status" ASC, R."priority" DESC, R."updatedAt" ASC LIMIT :limit OFFSET :offset';
      return await this.db.sequelize.query(query, {
        replacements,
        type: this.db.sequelize.QueryTypes.SELECT,
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("All requests retrieval failed: " + errors);
    }
  }

  countAll = async (data) => {
    try {
      return await this.Request.count({
        where: {
          ...(data.status && { status: data.type }),
          ...(data.category && { category: data.category }),
          ...(data.ward && { ward: data.ward }),
          ...(data.district && { district: data.district }),
          ...(data.city_province && { city_province: data.city_province })
        }
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("All requests counted failed: " + errors);
    }
  }

  getOne = async (data) => {
    try {
      const result = await this.db.sequelize.query(
        `SELECT R."id", R."name", R."quantity", R."priority",
        R."status", R."category", R."unit", R."address_line",
        R."ward", R."district", R."city_province", R."createdAt",
        R."updatedAt", "Users"."username" AS "recipient", R."proof_url" AS proof
        FROM "Requests" AS R
        LEFT OUTER JOIN "Users" ON R."recipientId" = "Users"."id"
        WHERE R."id" = :id;`,
        {
          replacements: { id: data.id },
          type: this.db.sequelize.QueryTypes.SELECT,
        }
      );
      if (result.length === 0) throw new Error('Request not found');
      return result[0];
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Request retrieval failed: " + errors);
    }
  }

  getMine = async (data) => {
    try {
      const order = ` ORDER BY
        CASE R."status"
          WHEN 2 THEN 1
          WHEN 1 THEN 2
          WHEN 3 THEN 3
          WHEN 4 THEN 4
        END ASC, R."priority" DESC, R."updatedAt" ASC`;
      let query = `SELECT R."id", R."name", R."quantity", R."priority",
        R."status", R."category", R."unit", R."address_line",
        R."ward", R."district", R."city_province", R."createdAt",
        R."updatedAt", "Users"."username" AS "recipient", R."proof_url" AS proof
        FROM "Requests" AS R
        LEFT OUTER JOIN "Users" ON R."recipientId" = "Users"."id"
        WHERE R."recipientId" = :recipientId`;
      if (data.type) query += ' AND R."status" = :status';
      query += order + ' LIMIT :limit OFFSET :offset';
      return await this.db.sequelize.query(query, {
        replacements: {
          recipientId: data.recipientId,
          status: data.type,
          limit: data.limit,
          offset: data.offset
        },
        type: this.db.sequelize.QueryTypes.SELECT,
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("My requests retrieval failed: " + errors);
    }
  }

  countMine = async (data) => {
    try {
      return await this.Request.count({
        where: {
          recipientId: data.recipientId
        }
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("My requests counted failed: " + errors);
    }
  }

  getReview = async (data) => {
    try {
      const result = await this.db.sequelize.query(
        `SELECT R."id", R."name", R."quantity", R."priority",
        R."category", R."unit", R."proof", R."address_line",
        R."ward", R."district", R."city_province", R."createdAt",
        R."updatedAt", "Users"."username" AS "reviewer"
        FROM "RequestReview" AS R
        LEFT OUTER JOIN "Users" ON R."reviewerId" = "Users"."id"
        WHERE R."requestId" = :id;`,
        {
          replacements: { id: data.id },
          type: this.db.sequelize.QueryTypes.SELECT,
        }
      );
      return result[0];
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Request review retrieval failed: " + errors);
    }
  }

  create = async (data) => {
    try {
      return await this.Request.create({
        category: data.category,
        unit: data.unit,
        recipientId: data.recipientId,
        name: data.name,
        quantity: data.quantity,
        status: 1,
        priority: data.priority,
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Request creation failed: " + errors);
    }
  }

  review = async (data) => {
    try {
      await this.RequestReview.upsert({
        category: data.category,
        unit: data.unit,
        reviewerId: data.reviewerId,
        requestId: data.id,
        name: data.name,
        quantity: data.quantity,
        priority: data.priority,
        proof: data.proof,
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Request review failed: " + errors);
    }
  }

  accept = async (data) => {
    try {
      await this.Request.update({
        status: 3,
      }, { where: { id: data.id }, },);
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Request accept failed: " + errors);
    }
  }

  addProof = async (data) => {
    try {
      await this.Request.update({
        proof_url: data.url,
        proof_public_id: data.public_id
      }, { where: { id: data.id }, },);
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Request proof addition failed: " + errors);
    }
  }
  
  edit = async (data) => {
    try {
      await this.Request.update({
        category: data.category,
        unit: data.unit,
        name: data.name,
        quantity: data.quantity,
        priority: data.priority,
        status: 1,
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province
      }, {
        where: {
          id: data.id
        }
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Request edit failed: " + errors);
    }
  }

  updateStatus = async (data) => {
    try {
      await this.Request.update({
        status: data.status,
      }, { where: { id: data.id }, },);
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Request status update failed: " + errors);
    }
  }

  delete = async (data) => {
    try {
      await this.Request.destroy({ where: { id: data.id }, force: true });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Request deletion failed: " + errors);
    }
  }
}