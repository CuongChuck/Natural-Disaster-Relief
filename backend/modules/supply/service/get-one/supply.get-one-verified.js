import ISupplyGetOneService from './supply.interface-get-one.js';

export default class SupplyGetOneVerified extends ISupplyGetOneService {
  constructor(opts) {
    super();
    this.supplyRepository = opts.supplySqlRepository;
    this.categoryGetOneService = opts.categoryGetOneService;
    this.unitGetOneService = opts.unitGetOneService;
    this.eventGetBySupply = opts.eventGetAllBySupplyService;
  }

  format = (supply, _category, _unit) => {
    const { category, unit, ...remain } = supply;
    return {
      category: _category,
      unit: _unit,
      ...remain
    }
  }

  getOne = async (data) => {
    try {
      const supply = await this.supplyRepository.getOne({ id: data.id });
      const [category, unit] = await Promise.all([
        this.categoryGetOneService.getOne({ id: supply.category }),
        this.unitGetOneService.getOne({ id: supply.unit })
      ]);
      const size = 100;
      const page = 1;
      const events = await this.eventGetBySupply.getAll({ supplyId: data.id, size, page });
      const result = this.format(supply, category, unit);
      result.events = events;
      return result;
    }
    catch (err) {
      throw err;
    }
  }
}