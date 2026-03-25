import IUnitRepository from './unit.interface-repository.js';

class UnitSqlRepository extends IUnitRepository {
  constructor({ redisClient }) {
    super();
    this.redis = redisClient;
  }

  findAll = async () => {
    try {
      return await this.redis.hGetAll('unit');
    }
    catch (err) {
      throw new Error("Units retrieval failed: " + err.message);
    }
  }

  findOne = async (data) => {
    try {
      return await this.redis.hGet('unit', data.id);
    }
    catch (err) {
      throw new Error(`Unit ${data.id} retrieval failed: ` + err.message);
    }
  }
}

export default UnitSqlRepository;