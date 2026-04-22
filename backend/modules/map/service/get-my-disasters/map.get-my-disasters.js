import IMapGetMyDisasters from "./map.interface-get-my-disasters.js";

export default class MapGetMyDisasters extends IMapGetMyDisasters {
  constructor({ mapSqlRepository }) {
    super();
    this.mapSql = mapSqlRepository;
  }

  getMine = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * 10;
      const [disasters, count] = await Promise.all([
        this.mapSql.getMyDisasters({ limit, offset, userId: data.userId }),
        this.mapSql.countMyDisasters({ userId: data.userId })
      ]);
      return {
        disasters,
        total_records: count
      }
    } catch (err) {
      throw err;
    }
  }
}