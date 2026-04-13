import IMapGetAllDisasters from "./map.interface-get-all-disasters.js";

export default class MapGetAllDisasters extends IMapGetAllDisasters {
  constructor({ mapSqlRepository, mapRedisRepository }) {
    super();
    this.mapSql = mapSqlRepository;
    this.mapRedis = mapRedisRepository;
  }

  getAll = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * 10;
      const [disasters, count, types] = await Promise.all([
        this.mapSql.getAllDisasters(offset, limit),
        this.mapSql.countAllDisasters(),
        this.mapRedis.getTypes()
      ]);
      return {
        disasters: disasters.map((record) => {
          const { type, ...remain } = record;
          return { type: types[type], ...remain }
        }),
        total_records: count
      }
    } catch (err) {
      throw err;
    }
  }
}