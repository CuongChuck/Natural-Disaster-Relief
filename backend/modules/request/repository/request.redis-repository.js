import IRequestRepository from "./request.interface-repository.js";
import { IRequestCacheRepository } from "./request.interface-cache-repository.js";

export default class RequestRedisRepository extends IRequestCacheRepository(IRequestRepository) {
  constructor({ redisClient }) {
    super();
    this.redis = redisClient;
  }

  getStatus = async () => {
    try {
      return await this.redis.hGetAll('request_status');
    } catch (err) {
      throw new Error('Error in retrieving status names: ' + err.message);
    }
  }
}