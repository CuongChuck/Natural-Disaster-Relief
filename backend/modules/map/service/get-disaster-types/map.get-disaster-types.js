import IMapGetDisasterTypes from "./map.interface-get-disaster-types.js";

export default class MapGetDisasterTypes extends IMapGetDisasterTypes {
  constructor({ mapRedisRepository }) {
    super();
    this.mapRedis = mapRedisRepository;
  }

  getTypes = async () => {
    try {
      return await this.mapRedis.getTypes();
    } catch (err) {
      throw err;
    }
  }
}