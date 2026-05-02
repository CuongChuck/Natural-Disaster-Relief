import IDeliveryRepository from "./delivery.interface-repository.js";
import { IDeliveryCacheRepository } from "./delivery.interface-cache-repository.js";

export default class DeliveryRedisRepository extends IDeliveryCacheRepository(IDeliveryRepository) {
  constructor({ redisClient }) {
    super();
    this.redis = redisClient;
  }

}