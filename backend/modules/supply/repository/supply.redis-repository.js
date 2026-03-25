import ISupplyRepository from "./supply.interface-repository.js";
import { ISupplyCacheRepository } from "./supply.interface-cache-repository.js";

class SupplyRedisRepository extends ISupplyCacheRepository(ISupplyRepository) {
  constructor({ redisClient }) {
    super();
    this.redis = redisClient;
  }

  getAll = async () => {
    try {
      return await this.redis.ft.search('idx:supplies', '*');
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
      return await this.redis.ft.search('idx:supplies', `@userId:[${data.userId} ${data.userId}]`);
    } catch (err) {
      throw new Error('Error in retrieving my unverified supplies: ' + err.message);
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
    } catch (err) {
      throw new Error('Error in creating a new supply: ' + err.message);
    }
  }

  edit = async (data) => {
    
  }

  delete = async (data) => {
    
  }
}

export default SupplyRedisRepository;