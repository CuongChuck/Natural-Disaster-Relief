import IMapGetOneDisaster from "./map.interface-get-one-disaster.js";

export default class MapGetOneDisaster extends IMapGetOneDisaster {
  constructor({ mapSqlRepository }) {
    super();
    this.mapSql = mapSqlRepository;
  }

  getOne = async (data) => {
    try {
      const disaster = await this.mapSql.getOneDisaster(data);
      return disaster;
    } catch (err) {
      throw err;
    }
  }
}