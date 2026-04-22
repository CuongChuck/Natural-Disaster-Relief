import IMapCreateDisaster from "./map.interface-create-disaster.js";

export default class MapCreateDisaster extends IMapCreateDisaster {
  constructor({ mapSqlRepository }) {
    super();
    this.mapSql = mapSqlRepository;
  }

  create = async (data) => {
    try {
      const disaster = await this.mapSql.createDisaster(data);
      const user = await disaster.getUser({ attributes: ['name'] });
      const result = disaster.toJSON();
      result.area = result.area.coordinates;
      delete result.userId;
      result.user = user.name;
      return result;
    } catch (err) {
      throw err;
    }
  }
}