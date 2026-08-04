import IMapDeleteDisaster from "./map.interface-delete-disaster.js";

export default class MapDeleteDisaster extends IMapDeleteDisaster {
  constructor({ mapSqlRepository }) {
    super();
    this.mapSql = mapSqlRepository;
  }

  delete = async (data) => {
    try {
      const disaster = await this.mapSql.getCreator({ id: data.id });
      if (data.userId !== disaster.userId)
        throw new Error('User is not authorized to delete this disaster');
      await this.mapSql.deleteDisaster({ id: data.id });
    } catch (err) {
      throw err;
    }
  }
}