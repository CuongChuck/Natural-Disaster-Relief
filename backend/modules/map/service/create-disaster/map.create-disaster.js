import IMapCreateDisaster from "./map.interface-create-disaster.js";

export default class MapCreateDisaster extends IMapCreateDisaster {
  constructor({ mapSqlRepository, mapRedisRepository }) {
    super();
    this.mapSql = mapSqlRepository;
    this.mapRedis = mapRedisRepository;
  }

  create = async (data) => {
    try {
      const disaster = await this.mapSql.createDisaster(data);
      const type = await this.mapRedis.getType({ id: disaster.type });
      const user = await disaster.getUser({ attributes: ['name'] });
      const result = disaster.toJSON();
      result.type = type;
      result.area = result.area.coordinates;
      delete result.userId;
      result.user = user.name;
      return result;
    } catch (err) {
      throw err;
    }
  }
}