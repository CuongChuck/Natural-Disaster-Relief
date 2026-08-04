import IMapEditDisaster from "./map.interface-edit-disaster.js";

export default class MapEditDisaster extends IMapEditDisaster {
  constructor({ mapSqlRepository }) {
    super();
    this.mapSql = mapSqlRepository;
  }

  edit = async (data) => {
    try {
      const disasterCreator = await this.mapSql.getCreator({ id: data.id });
      if (data.userId !== disasterCreator.userId)
        throw new Error('User is not authorized to edit this disaster');
      await this.mapSql.updateDisaster(data);
      const disaster = await this.mapSql.getOneDisaster({ id: data.id });
      return disaster;
    } catch (err) {
      throw err;
    }
  }
}