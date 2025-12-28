import IUnitRepository from './unit.interface-repository.js';

class UnitSqlRepository extends IUnitRepository {
  constructor({ Unit }) {
    super();
    this.Unit = Unit;
  }

  async findAll() {
    try {
      return await this.Unit.findAll({ attributes: ['id', 'name'] });
    }
    catch (err) {
      throw new Error("Unit retrieval failed: " + err.message);
    }
  }
}

export default UnitSqlRepository;