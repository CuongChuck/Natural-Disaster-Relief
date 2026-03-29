import ISupplyRepository from "./supply.interface-repository.js";
import { ISupplyCacheRepository } from "./supply.interface-cache-repository.js";

class SupplyRedisRepository extends ISupplyCacheRepository(ISupplyRepository) {
  constructor({ redisClient }) {
    super();
    this.redis = redisClient;
  }

  getAll = async (offset, limit) => {
    try {
      return await this.redis.ft.search('idx:supplies', '*', {
        LIMIT: {
          from: offset,
          size: limit
        }
      });
    } catch (err) {
      throw new Error('Error in retrieving unverified supplies: ' + err.message);
    }
  }

  getOne = async (data) => {
    try {
      return await this.redis.json.get(`supply:${data.id}`);
    } catch (err) {
      throw new Error(`Error in retrieving supply ${data.id}: ` + err.message);
    }
  }

  getMine = async (data) => {
    try {
      return await this.redis.ft.search('idx:supplies', `@donorId:[${data.donorId} ${data.donorId}]`, {
        LIMIT: {
          from: data.offset,
          size: data.limit
        }
      });
    } catch (err) {
      throw new Error('Error in retrieving my unverified supplies: ' + err.message);
    }
  }

  getReview = async (data) => {
    try {
      return await this.redis.json.get(`supply_review:${data.id}`);
    } catch (err) {
      throw new Error(`Error in retrieving supply review ${data.id}: ` + err.message);
    }
  }

  checkOwner = async (data) => {
    try {
      const donorIds = await this.redis.json.get(`supply:${data.id}`, { path: '$.donorId' });
      if (data.donorId != donorIds[0]) throw new Error('User is not authorized to modify this supply');
    } catch (err) {
      throw new Error('Error in checking supply owner: ' + err.message);
    }
  }

  create = async (data) => {
    try {
      const id = await this.redis.get('supply_id');
      await this.redis.multi()
        .json.set(`supply:${id}`, '$', data)
        .incr('supply_id')
        .exec()
        .then((result) => {}, (err) => {
          throw new Error(err.message);
        });
      return id;
    } catch (err) {
      throw new Error('Error in creating a new supply: ' + err.message);
    }
  }

  review = async (data) => {
    try {
      const { id, ...input } = data;
      await this.redis.json.set(`supply_review:${id}`, '$', data);
    } catch (err) {
      throw new Error('Error in reviewing a supply: ' + err.message);
    }
  }

  outdateReview = async (data) => {
    try {
      await this.redis.json.set(`supply_review:${data.id}`, '$.updated', false);
    } catch (err) {
      throw new Error('Error in outdating a review on supply: ' + err.message);
    }
  }

  edit = async (data) => {
    try {
      const { id, donorId, ...input } = data;
      const key = `supply:${id}`;
      for (const [field, value] of Object.entries(input)) {
        await this.redis.json.set(key, `$.${field}`, value);
      }
    } catch (err) {
      throw new Error('Error in editing a supply: ' + err.message);
    }
  }

  delete = async (data) => {
    try {
      await this.redis.json.del(`supply:${data.id}`, '$');
    } catch (err) {
      throw new Error('Error in deleting a supply: ' + err.message);
    }
  }
}

export default SupplyRedisRepository;