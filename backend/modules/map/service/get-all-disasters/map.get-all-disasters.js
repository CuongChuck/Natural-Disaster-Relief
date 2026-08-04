import IMapGetAllDisasters from "./map.interface-get-all-disasters.js";

export default class MapGetAllDisasters extends IMapGetAllDisasters {
  constructor({ mapSqlRepository }) {
    super();
    this.mapSql = mapSqlRepository;
  }

  getAll = async (data) => {
    try {
      const limit = parseInt(data.size, 10);
      const offset = (parseInt(data.page, 10) - 1) * limit;
      const [disasters, count] = await Promise.all([
        this.mapSql.getAllDisasters(offset, limit),
        this.mapSql.countAllDisasters()
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