import IEventRepository from './event.interface-repository.js';
import { IEventCacheRepository } from './event.interface-cache-repository.js';

export default class EventRedisRepository extends IEventCacheRepository(IEventRepository) {
  constructor({ redisClient }) {
    super();
    this.redis = redisClient;
  }

  getNames = async () => {
    try {
      return await this.redis.hGetAll('event');
    } catch (err) {
      throw new Error('Event names retrieval failed: ', err.message);
    }
  }

  getName = async (data) => {
    try {
      return await this.redis.hGet('event', `${data.id}`);
    } catch (err) {
      throw new Error(`Event name ${data.id} retrieval failed: `, err.message);
    }
  }
}