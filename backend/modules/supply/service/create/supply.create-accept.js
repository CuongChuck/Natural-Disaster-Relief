import ISupplyCreateService from './supply.interface-create.js';

export default class SupplyCreateAcceptService extends ISupplyCreateService {
  constructor(opts) {
    super();
    this.supplyRedis = opts.supplyRedisRepository;
    this.supplySQL = opts.supplySqlRepository;
    this.categoryGetOneService = opts.categoryGetOneService;
    this.unitGetOneService = opts.unitGetOneService;
    this.userCheckService = opts.userCheckService;
    this.eventCreateService = opts.eventCreateService;
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
      await this.supplyRedis.deleteReview({ id });
      await this.eventCreateService.create({
        userId: data.userId,
        description: null,
        name: 2,
        startTime: new Date(),
        address_line: null,
        ward: "admin",
        district: "admin",
        city_province: "admin",
        supplies: [id]
      });
      return this.format(result, category, unit);
    }
    catch (err) {
      throw err;
    }
  }
}