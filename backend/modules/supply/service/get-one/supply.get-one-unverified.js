import ISupplyGetOneService from './supply.interface-get-one.js';

export default class SupplyGetOneUnverified extends ISupplyGetOneService {
  constructor(opts) {
    super();
    this.supplyRepository = opts.supplyRedisRepository;
    this.categoryGetOneService = opts.categoryGetOneService;
    this.unitGetOneService = opts.unitGetOneService;
    this.userGetService = opts.userGetService;
    this.eventGetBySupply = opts.eventGetAllBySupplyService;
  }

  format = (id, supply, _category, _unit, username) => {
    const { category, unit, donorId, ...remain } = supply;
    return {
      id: Number(id),
      category: _category,
      unit: _unit,
      donor: username,
      ...remain
    }
  }

  getOne = async (data) => {
    try {
      const supply = await this.supplyRepository.getOne(data);
      const category = await this.categoryGetOneService.getOne({ id: supply.category });
      const unit = await this.unitGetOneService.getOne({ id: supply.unit });
      const user = await this.userGetService.getUser({ userId: supply.donorId });
      const size = 100;
      const page = 1;
      const events = await this.eventGetBySupply.getAll({ supplyId: data.id, size, page });
      const result = this.format(data.id, supply, category, unit, user.username);
      result.events = events;
      return result;
    }
    catch (err) {
      throw err;
    }
  }
}