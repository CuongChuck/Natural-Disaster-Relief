import ISupplyCreateService from './supply.interface-create.js';

class SupplyCreateAcceptService extends ISupplyCreateService {
  constructor({ supplyRedisRepository, supplySqlRepository, categoryGetOneService, unitGetOneService, userCheckService }) {
    super();
    this.supplyRedis = supplyRedisRepository;
    this.supplySQL = supplySqlRepository;
    this.categoryGetOneService = categoryGetOneService;
    this.unitGetOneService = unitGetOneService;
    this.userCheckService = userCheckService;
  }

  format = (supply, _category, _unit) => {
    const { category, unit, ...remain } = supply;
    return {
      category: _category,
      unit: _unit,
      ...remain
    }
  }

  create = async (data) => {
    try {
      await this.userCheckService.checkOperator({ userId: data.userId });
      const id = data.id;
      const supply = await this.supplyRedis.getOne({ id });
      supply.id = id;
      supply.updatedAt = new Date();
      await this.supplySQL.create(supply);
      const [result, category, unit] = await Promise.all([
        this.supplySQL.getOne({ id }),
        this.categoryGetOneService.getOne({ id: supply.category }),
        this.unitGetOneService.getOne({ id: supply.unit })
      ]);
      await this.supplyRedis.delete({ id });
      return this.format(result, category, unit);
    }
    catch (err) {
      throw err;
    }
  }
}

export default SupplyCreateAcceptService;