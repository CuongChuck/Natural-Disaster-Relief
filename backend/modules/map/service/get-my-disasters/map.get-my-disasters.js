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
      const [disasters, count, types] = await Promise.all([
        this.mapSql.getMyDisasters({ limit, offset, userId: data.userId }),
        this.mapSql.countMyDisasters({ userId: data.userId }),
        this.mapRedis.getTypes()
      ]);
      return {
        disasters: disasters.map((record) => {
          const { type, ...remain } = record;
          return { type: types[type], ...remain };
        }),
        total_records: count
      }
    } catch (err) {
      throw err;
    }
  }
}