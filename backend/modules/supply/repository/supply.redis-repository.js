import ISupplyRepository from "./supply.interface-repository.js";
import { ISupplyCacheRepository } from "./supply.interface-cache-repository.js";

export default class SupplyRedisRepository extends ISupplyCacheRepository(ISupplyRepository) {
  constructor({ redisClient }) {
    super();
    this.redis = redisClient;
  }

  getStatus = async () => {
    try {
      return await this.redis.hGetAll('supply_status');
    } catch (err) {
      throw new Error('Error in retrieving supply status: ' + err.message);
    }
  }
}