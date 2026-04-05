import IMapGetMyDisasters from "./map.interface-get-my-disasters.js";

export default class MapGetMyDisasters extends IMapGetMyDisasters {
  constructor({ mapSqlRepository, mapRedisRepository }) {
    super();
    this.mapSql = mapSqlRepository;
    this.mapRedis = mapRedisRepository;
  }

  getMine = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * 10;
      const disasters = await this.mapSql.getMyDisasters({ limit, offset, userId: data.userId });
      const types = await this.mapRedis.getTypes();
      return disasters.map((record) => {
        const { type, ...remain } = record;
        return { type: types[type], ...remain };
      });
    } catch (err) {
      throw err;
    }
  }
}