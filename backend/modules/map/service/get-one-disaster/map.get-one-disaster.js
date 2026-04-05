import IMapGetOneDisaster from "./map.interface-get-one-disaster.js";

export default class MapGetOneDisaster extends IMapGetOneDisaster {
  constructor({ mapSqlRepository, mapRedisRepository }) {
    super();
    this.mapSql = mapSqlRepository;
    this.mapRedis = mapRedisRepository;
  }

  getOne = async (data) => {
    try {
      const disaster = await this.mapSql.getOneDisaster(data);
      const type = await this.mapRedis.getType({ id: disaster.name });
      disaster.type = type;
      return disaster;
    } catch (err) {
      throw err;
    }
  }
}