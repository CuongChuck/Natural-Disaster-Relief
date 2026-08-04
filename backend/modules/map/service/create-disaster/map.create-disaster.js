import IMapCreateDisaster from "./map.interface-create-disaster.js";

export default class MapCreateDisaster extends IMapCreateDisaster {
  constructor({ mapSqlRepository, userGetService }) {
    super();
    this.mapSql = mapSqlRepository;
    this.userGetService = userGetService;
  }

  create = async (data) => {
    try {
      const disaster = await this.mapSql.createDisaster(data);
      return disaster;
    } catch (err) {
      throw err;
    }
  }
}