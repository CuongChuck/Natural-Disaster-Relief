import IMapRepository from './map.interface-repository.js';
import { IMapCacheRepository } from './map.interface-cache-repository.js';

export default class MapRedisRepository extends IMapCacheRepository(IMapRepository) {
  constructor({ redisClient }) {
    super();
    this.redis = redisClient;
  }

  getTypes = async () => {
    try {
      return await this.redis.hGetAll('disaster');
    } catch (err) {
      throw new Error('Event names retrieval failed: ', err.message);
    }
  }

  getType = async (data) => {
    try {
      return await this.redis.hGet('disaster', `${data.id}`);
    } catch (err) {
      throw new Error(`Event name ${data.id} retrieval failed: `, err.message);
    }
  }
}