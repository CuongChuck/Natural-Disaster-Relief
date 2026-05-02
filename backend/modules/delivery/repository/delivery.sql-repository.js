import IDeliveryRepository from "./delivery.interface-repository.js";
import { IDeliveryStorageRepository } from "./delivery.interface-storage-repository.js";

export default class DeliverySqlRepository extends IDeliveryStorageRepository(IDeliveryRepository) {
  constructor({ Delivery, db }) {
    super();
    this.Delivery = Delivery;
    this.db = db;
  }

  checkOwner = async (data) => {
    try {
      const delivery = await this.Delivery.findOne({
        where: {
          id: data.id,
          recipientId: data.recipientId
        }
      });
      if (delivery.length === 0) throw new Error('User is not authorized to modify this delivery');
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Delivery owner check failed: " + errors);
    }
  }

  getAll = async (data) => {
    try {
      return await this.db.sequelize.query(
        `SELECT D."id", D."address_line", D."ward", D."district",
		    D."city_province", D."createdAt", D."updatedAt",
		    R."username" AS "recipient", O."name" AS "operator",
		    D."proof_url" AS proof, D."receipt_url" AS receipt
        FROM "Deliveries" D
        LEFT OUTER JOIN "Users" R ON D."recipientId" = R."id"
		    LEFT OUTER JOIN "Users" O ON D."operatorId" = O."id"
        LIMIT ${data.limit}
        OFFSET ${data.offset};`,
        { type: this.db.sequelize.QueryTypes.SELECT, }
      );
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("All deliveries retrieval failed: " + errors);
    }
  }

  countAll = async () => {
    try {
      return await this.Delivery.count();
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("All deliveries counted failed: " + errors);
    }
  }

  getOne = async (data) => {
    try {
      const result = await this.db.sequelize.query(
        `SELECT D."id", D."address_line", D."ward", D."district",
		    D."city_province", D."createdAt", D."updatedAt",
		    R."username" AS "recipient", O."name" AS "operator",
		    D."proof_url" AS proof, D."receipt_url" AS receipt
        FROM "Deliveries" D
        LEFT OUTER JOIN "Users" R ON D."recipientId" = R."id"
		    LEFT OUTER JOIN "Users" O ON D."operatorId" = O."id"
        WHERE D."id" = ${data.id};`,
        { type: this.db.sequelize.QueryTypes.SELECT, }
      );
      if (result.length === 0)
        throw new Error('Delivery not found');
      return result[0];
    }
    catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Delivery retrieval failed: " + errors);
    }
  }

  getMine = async (data) => {
    try {
      return await this.db.sequelize.query(
        `SELECT D."id", D."address_line", D."ward", D."district",
		    D."city_province", D."createdAt", D."updatedAt",
		    R."username" AS "recipient", O."name" AS "operator",
		    D."proof_url" AS proof, D."receipt_url" AS receipt
        FROM "Deliveries" D
        LEFT OUTER JOIN "Users" R ON D."recipientId" = R."id"
		    LEFT OUTER JOIN "Users" O ON D."operatorId" = O."id"
        WHERE D."operatorId" = ${data.operatorId}$
        LIMIT ${data.limit}
        OFFSET ${data.offset};`,
        { type: this.db.sequelize.QueryTypes.SELECT, }
      );
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("My deliveries retrieval failed: " + errors);
    }
  }

  countMine = async (data) => {
    try {
      return await this.Delivery.count({
        where: {
          operatorId: data.operatorId
        }
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("My deliveries counted failed: " + errors);
    }
  }

  create = async (data) => {
    try {
      return await this.Delivery.create({
        supplyId: data.id,
        address_line: data.address_line,
        ward: data.ward,
        district: data.district,
        city_province: data.city_province
      });
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Delivery creation failed: " + errors);
    }
  }

  addProof = async (data) => {
    try {
      await this.Delivery.update({
        receipt_url: data.receipt.url,
        receipt_public_id: data.receipt.public_id,
        proof_url: data.proof.url,
        proof_public_id: data.proof.public_id
      }, { where: { id: data.id }, },);
    } catch (err) {
      const errors = err.errors ? err.errors.reduce((acc, ele) => acc + ele.message + ', ', '') : err.message;
      throw new Error("Delivery proof addition failed: " + errors);
    }
  }
}